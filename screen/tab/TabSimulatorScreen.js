import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Dimensions, TouchableWithoutFeedback } from 'react-native';

const { width, height } = Dimensions.get('window');
const BALL_SIZE = 20;
const GATE_WIDTH = 100;
const GATE_HEIGHT = 20;
const FIXED_TIME_STEP = 1000 / 60; // 60 FPS
const FIELD_MARGIN = 50;
const TabSimulatorScreen = () => {
  const [ballPosition, setBallPosition] = useState({ 
    x: width / 2 - BALL_SIZE / 2, 
    y: GATE_HEIGHT 
  });
  const ballVelocity = useRef(getRandomVelocity());
  const lastUpdateTime = useRef(Date.now());
  const accumulator = useRef(0);

  function getRandomVelocity() {
    const speed = 0.1 + Math.random() * 0.05; // Speed between 0.1 and 0.15 units per millisecond
    const angle = (Math.random() * 120 + 30) * (Math.PI / 180); // Angle between 30 and 150 degrees
    return {
      dx: speed * Math.cos(angle),
      dy: speed * Math.sin(angle)
    };
  }

  const handleBallPress = () => {
    if (ballPosition.y > height / 2) {
      ballVelocity.current = {
        ...ballVelocity.current,
        dy: -Math.abs(ballVelocity.current.dy) - 0.1 // Kick the ball upwards with extra speed
      };
    }
  };

  useEffect(() => {
    const updateGame = () => {
      const now = Date.now();
      const frameTime = now - lastUpdateTime.current;
      lastUpdateTime.current = now;

      accumulator.current += frameTime;

      while (accumulator.current >= FIXED_TIME_STEP) {
        setBallPosition(prevPos => {
          let newX = prevPos.x + ballVelocity.current.dx * FIXED_TIME_STEP;
          let newY = prevPos.y + ballVelocity.current.dy * FIXED_TIME_STEP;

          // Bounce off walls
          if (newX <= 0 || newX >= width - BALL_SIZE) {
            ballVelocity.current.dx = -ballVelocity.current.dx;
          }

          // Reset if ball reaches bottom or top
          if (newY >= height - GATE_HEIGHT - BALL_SIZE || newY <= GATE_HEIGHT) {
            ballVelocity.current = getRandomVelocity();
            return { x: width / 2 - BALL_SIZE / 2, y: GATE_HEIGHT };
          }

          return {
            x: Math.max(0, Math.min(newX, width - BALL_SIZE)),
            y: Math.max(GATE_HEIGHT, Math.min(newY, height - GATE_HEIGHT - BALL_SIZE)),
          };
        });

        accumulator.current -= FIXED_TIME_STEP;
      }

      requestAnimationFrame(updateGame);
    };

    const animationFrame = requestAnimationFrame(updateGame);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={handleBallPress}>
      <View style={styles.container}>
        <View style={[styles.gate, styles.topGate]} />
        <View style={[styles.ball, { left: ballPosition.x, top: ballPosition.y }]} />
        <View style={[styles.gate, styles.bottomGate]} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default TabSimulatorScreen;

const styles = StyleSheet.create({
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
    top: FIELD_MARGIN,
  },
  bottomGate: {
    bottom: FIELD_MARGIN,
  },
  ball: {
    position: 'absolute',
    width: BALL_SIZE,
    height: BALL_SIZE,
    borderRadius: BALL_SIZE / 2,
    backgroundColor: 'red',
  },
});
