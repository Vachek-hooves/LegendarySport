import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const BALL_SIZE = 20;
const GATE_WIDTH = 100;
const GATE_HEIGHT = 20;

const TabSimulatorScreen = () => {
  const [ballPosition, setBallPosition] = useState({ 
    x: width / 2 - BALL_SIZE / 2, 
    y: GATE_HEIGHT 
  });
  const [ballVelocity, setBallVelocity] = useState(() => getRandomVelocity());

  function getRandomVelocity() {
    const speed = 3 + Math.random() * 2; // Speed between 3 and 5
    const angle = (Math.random() * 120 + 30) * (Math.PI / 180); // Angle between 30 and 150 degrees
    return {
      dx: speed * Math.cos(angle),
      dy: speed * Math.sin(angle)
    };
  }

  useEffect(() => {
    const moveBall = () => {
      setBallPosition(prevPos => {
        let newX = prevPos.x + ballVelocity.dx;
        let newY = prevPos.y + ballVelocity.dy;

        // Bounce off walls
        if (newX <= 0 || newX >= width - BALL_SIZE) {
          setBallVelocity(prev => ({ ...prev, dx: -prev.dx }));
        }

        // Reset if ball reaches bottom
        if (newY >= height - GATE_HEIGHT - BALL_SIZE) {
          setBallVelocity(getRandomVelocity());
          return { x: width / 2 - BALL_SIZE / 2, y: GATE_HEIGHT };
        }

        return {
          x: Math.max(0, Math.min(newX, width - BALL_SIZE)),
          y: Math.max(GATE_HEIGHT, Math.min(newY, height - GATE_HEIGHT - BALL_SIZE)),
        };
      });
    };

    const intervalId = setInterval(moveBall, 16); // 60 FPS
    return () => clearInterval(intervalId);
  }, [ballVelocity]);

  return (
    <View style={styles.container}>
      <View style={[styles.gate, styles.topGate]} />
      <View style={[styles.ball, { left: ballPosition.x, top: ballPosition.y }]} />
      <View style={[styles.gate, styles.bottomGate]} />
    </View>
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
    top: 0,
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
  },
});
