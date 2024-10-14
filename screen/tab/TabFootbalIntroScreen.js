import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useAppContext } from '../../store/context';

const TabFootballIntroScreen = ({ navigation }) => {
  const { highScore, totalGames } = useAppContext();

  return (
    <ImageBackground
      source={require('../../assets/image/bg/FootballField.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <LinearGradient
          colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.3)']}
          style={styles.overlay}
        >
          <View style={styles.content}>
            <Text style={styles.title}>Football Challenge</Text>
            <View style={styles.statsContainer}>
              <Text style={styles.statsText}>High Score: {highScore}</Text>
              <Text style={styles.statsText}>Total Games: {totalGames}</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('StackFootballPlay')}
              style={styles.playButton}
            >
              <LinearGradient
                colors={['#4c669f', '#3b5998', '#192f6a']}
                style={styles.gradient}
              >
                <Text style={styles.buttonText}>Play Now</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  statsContainer: {
    marginBottom: 30,
  },
  statsText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
  playButton: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  gradient: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TabFootballIntroScreen;
