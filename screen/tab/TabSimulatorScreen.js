import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, Text, SafeAreaView } from 'react-native';

const { width, height } = Dimensions.get('window');
const BALL_SIZE = 30;
const GATE_WIDTH = 100;
const GATE_HEIGHT = 20;
const FIXED_TIME_STEP = 1000 / 60; // 60 FPS
const SCOREBOARD_HEIGHT = 80;

const TabSimulatorScreen = () => {
  const [ballPosition, setBallPosition] = useState(() => getInitialBallPosition());
  const ballVelocity = useRef({ dx: 0, dy: 0 });
  const ballSpeed = useRef(1);
  const lastUpdateTime = useRef(Date.now());
  const accumulator = useRef(0);
  const [scores, setScores] = useState({ top: 0, bottom: 0 });

  const TOUCHABLE_AREA_START = SCOREBOARD_HEIGHT + (height - SCOREBOARD_HEIGHT) * 0.4; // 60% of field from bottom

  function getInitialBallPosition() {
    return {
      x: width / 2 - BALL_SIZE / 2,
      y: SCOREBOARD_HEIGHT + GATE_HEIGHT + BALL_SIZE // Just below the computer's gate
    };
  }

  function getRandomVelocity() {
    const baseSpeed = (0.1 + Math.random() * 0.05) * ballSpeed.current;
    const angle = (Math.random() * 60 + 60) * (Math.PI / 180);
    return {
      dx: baseSpeed * Math.cos(angle),
      dy: Math.abs(baseSpeed * Math.sin(angle))
    };
  }

  const handleBallPress = () => {
    console.log('Ball pressed');
    if (ballPosition.y >= TOUCHABLE_AREA_START) {
      console.log('Ball in touchable area, kicking');
      ballVelocity.current = {
        ...ballVelocity.current,
        dy: -Math.abs(ballVelocity.current.dy) - 0.2 // Kick the ball upwards with extra speed
      };
      console.log('Ball kicked!', ballVelocity.current);
      // Force an update to ensure the new velocity is applied immediately
      setBallPosition(prevPos => ({ ...prevPos }));
    } else {
      console.log('Ball not in touchable area, not kicking');
    }
  };

  useEffect(() => {
    console.log('Game loop started');
    ballVelocity.current = getRandomVelocity();

    const updateGame = () => {
      const now = Date.now();
      const frameTime = now - lastUpdateTime.current;
      lastUpdateTime.current = now;

      accumulator.current += frameTime;

      while (accumulator.current >= FIXED_TIME_STEP) {
        setBallPosition(prevPos => {
          let newX = prevPos.x + ballVelocity.current.dx * FIXED_TIME_STEP;
          let newY = prevPos.y + ballVelocity.current.dy * FIXED_TIME_STEP;

          // Check if ball is out of bounds (touched top or bottom borders)
          if (newY <= SCOREBOARD_HEIGHT || newY >= height - BALL_SIZE) {
            console.log('Ball out of bounds, resetting');
            return resetBallPosition('out');
          }

          // Bounce off left and right walls
          if (newX <= 0 || newX >= width - BALL_SIZE) {
            console.log('Ball hit side wall, bouncing');
            ballVelocity.current.dx = -ballVelocity.current.dx;
            newX = Math.max(0, Math.min(newX, width - BALL_SIZE));
          }

          // Check for goals and update scores
          if (newY <= SCOREBOARD_HEIGHT + GATE_HEIGHT && 
              newX > (width - GATE_WIDTH) / 2 && 
              newX < (width + GATE_WIDTH) / 2) {
            console.log('Goal scored by player');
            setScores(prev => ({ ...prev, bottom: prev.bottom + 1 }));
            return resetBallPosition('bottom');
          } else if (newY >= height - GATE_HEIGHT - BALL_SIZE && 
                     newX > (width - GATE_WIDTH) / 2 && 
                     newX < (width + GATE_WIDTH) / 2) {
            console.log('Goal scored by computer');
            setScores(prev => ({ ...prev, top: prev.top + 1 }));
            return resetBallPosition('top');
          }

          return { x: newX, y: newY };
        });

        accumulator.current -= FIXED_TIME_STEP;
      }

      requestAnimationFrame(updateGame);
    };

    const animationFrame = requestAnimationFrame(updateGame);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const resetBallPosition = (reason) => {
    console.log('Resetting ball position, reason:', reason);
    if (reason === 'bottom') {
      ballSpeed.current *= 1.1;
      console.log('New ball speed:', ballSpeed.current);
    }
    ballVelocity.current = getRandomVelocity();
    ballVelocity.current.dy = Math.abs(ballVelocity.current.dy);
    console.log('New ball velocity:', ballVelocity.current);
    return getInitialBallPosition();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.scoreboard}>
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreLabel}>Computer</Text>
            <Text style={styles.scoreText}>{scores.top}</Text>
          </View>
          <Text style={styles.scoreDivider}>:</Text>
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreLabel}>You</Text>
            <Text style={styles.scoreText}>{scores.bottom}</Text>
          </View>
        </View>
        <View style={[styles.gate, styles.topGate]} />
        <View style={styles.touchableArea} />
        <TouchableOpacity
          style={[styles.ball, { left: ballPosition.x, top: ballPosition.y }]}
          onPress={handleBallPress}
          activeOpacity={0.5}
        />
        <View style={[styles.gate, styles.bottomGate]} />
      </View>
    </SafeAreaView>
  );
};

export default TabSimulatorScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  gate: {
    position: 'absolute',
    width: GATE_WIDTH,
    height: GATE_HEIGHT,
    backgroundColor: 'green',
    left: (width - GATE_WIDTH) / 2,
  },
  topGate: {
    top: SCOREBOARD_HEIGHT,
  },
  bottomGate: {
    bottom: 0,
  },
  ball: {
    position: 'absolute',
    width: BALL_SIZE,
    height: BALL_SIZE,
    borderRadius: BALL_SIZE / 2,
    backgroundColor: 'red',
    zIndex: 2,
  },
  scoreboard: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    zIndex: 1,
  },
  scoreContainer: {
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  scoreDivider: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginHorizontal: 10,
  },
  touchableArea: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: (height - SCOREBOARD_HEIGHT) * 0.5, // 60% of field height
    backgroundColor: 'rgba(255, 255, 0, 0.2)', // Semi-transparent yellow
    zIndex: 1,
  },
});
