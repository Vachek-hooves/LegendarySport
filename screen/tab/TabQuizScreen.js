import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useAppContext } from '../../store/context';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const TabQuizScreen = ({ navigation }) => {
  const { quizData } = useAppContext();

  const startQuiz = (sportId) => {
    const selectedSport = quizData.find((sport) => sport.id === sportId);
    navigation.navigate('StackQuizLevelScreen', { sport: selectedSport });
  };

  return (
    <ImageBackground
      source={require('../../assets/image/bg/quiz.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <LinearGradient
          colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.3)']}
          style={styles.overlay}
        >
            <SafeAreaView/>
          <Text style={styles.title}>Choose a Sport</Text>
          <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={false}
          >
            {quizData.map((sport) => (
              <TouchableOpacity
                key={sport.id}
                onPress={() => startQuiz(sport.id)}
                style={[styles.sportButton, !sport.isActive && styles.inactiveButton]}
                disabled={!sport.isActive}
              >
                <LinearGradient
                  colors={['#00FFFF', '#FF00FF', '#FF1493']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.gradient}
                >
                  <Text style={styles.sportButtonText}>{sport.sport}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
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
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  sportButton: {
    width: width * 0.8,
    height: 160,
    marginBottom: 15,
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    opacity:0.7
  },
  inactiveButton: {
    opacity: 0.2,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  sportButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
});

export default TabQuizScreen;
