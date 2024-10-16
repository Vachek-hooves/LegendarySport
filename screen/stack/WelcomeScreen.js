import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, Animated, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      navigation.navigate('TabNavigator');
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const yTranslate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [height, 0],
  });

  const rotate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['90deg', '0deg'],
  });

  const scale = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.1, 0.5, 1],
  });

  const opacity = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.5, 1],
  });

  return (
    <ImageBackground
      source={require('../../assets/image/bg/welcome.png')}
      style={styles.background}
    >
      <Animated.View
        style={[
          styles.textContainer,
          {
            transform: [
              { translateY: yTranslate },
              { rotate: rotate },
              { scale: scale },
            ],
            opacity: opacity,
          },
        ]}
      >
        <Text style={[styles.welcomeText, styles.legendaryText]}>Legendary</Text>
        <Text style={[styles.welcomeText, styles.sportsText]}>Sports</Text>
        <Text style={[styles.welcomeText, styles.momentsText]}>Moments</Text>
      </Animated.View>
    </ImageBackground>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    padding: 20,
    borderRadius: 10,
  },
  welcomeText: {
    fontSize: 64, // Doubled from 32 to 64
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  legendaryText: {
    color: '#ff00ff', // Neon pink
    textShadowColor: '#ff00ff',
  },
  sportsText: {
    color: '#00ffff', // Neon cyan
    textShadowColor: '#00ffff',
  },
  momentsText: {
    color: '#ffff00', // Neon yellow
    textShadowColor: '#ffff00',
  },
});
