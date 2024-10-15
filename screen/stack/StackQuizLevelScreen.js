import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useAppContext } from '../../store/context';

const StackQuizLevelScreen = ({ route, navigation }) => {
  const { sport } = route.params;
  const { updateQuizData, quizData } = useAppContext();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (showResult) {
      // Update the next sport to be active when the quiz is completed
      const updatedQuizData = quizData.map((item) => {
        if (item.id === sport.id + 1) {
          return { ...item, isActive: true };
        }
        return item;
      });
      updateQuizData(updatedQuizData);
    }
  }, [showResult]);

  const handleAnswer = (selectedAnswer) => {
    if (selectedAnswer === sport.questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < sport.questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <ImageBackground
        source={require('../../assets/image/bg/illuminatedArrow.jpg')}
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          <LinearGradient
            colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.3)']}
            style={styles.overlay}
          >
            <Text style={styles.resultText}>Quiz Completed!</Text>
            <Text style={styles.resultText}>Your Score: {score}/{sport.questions.length}</Text>
            <TouchableOpacity onPress={restartQuiz} style={styles.button}>
              <LinearGradient
                colors={['#00FFFF', '#FF00FF', '#FF1493']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradient}
              >
                <Text style={styles.buttonText}>Restart Quiz</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
              <LinearGradient
                colors={['#00FFFF', '#FF00FF', '#FF1493']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradient}
              >
                <Text style={styles.buttonText}>Back to Sports</Text>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require('../../assets/image/bg/illuminatedArrow.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <LinearGradient
          colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.3)']}
          style={styles.overlay}
        >
          <Text style={styles.questionText}>{sport.questions[currentQuestion].question}</Text>
          {sport.questions[currentQuestion].options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleAnswer(option)}
              style={styles.button}
            >
              <LinearGradient
                colors={['#00FFFF', '#FF00FF', '#FF1493']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradient}
              >
                <Text style={styles.buttonText}>{option}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
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
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  button: {
    width: '80%',
    height: 50,
    marginBottom: 15,
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});

export default StackQuizLevelScreen;
