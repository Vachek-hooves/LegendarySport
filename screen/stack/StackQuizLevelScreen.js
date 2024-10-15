import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Dimensions, Animated, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useAppContext } from '../../store/context';

const { width } = Dimensions.get('window');

const StackQuizLevelScreen = ({ route, navigation }) => {
  const { sport } = route.params;
  const { updateQuizData, quizData } = useAppContext();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [buttonScale] = useState(new Animated.Value(1));
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);

  useEffect(() => {
    if (showResult) {
      if (score >= 9) {
        const updatedQuizData = quizData.map((item) => {
          if (item.id === sport.id + 1) {
            return { ...item, isActive: true };
          }
          return item;
        });
        updateQuizData(updatedQuizData);
      }
    }
  }, [showResult]);

  const handleAnswer = (selected) => {
    setSelectedAnswer(selected);
    const correct = selected === sport.questions[currentQuestion].correctAnswer;
    setIsAnswerCorrect(correct);

    Animated.sequence([
      Animated.timing(buttonScale, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(buttonScale, { toValue: 1, duration: 100, useNativeDriver: true })
    ]).start();

    if (correct) {
      setScore(score + 1);
    }

    // Delay moving to the next question to show the feedback
    setTimeout(() => {
      if (currentQuestion + 1 < sport.questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setIsAnswerCorrect(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
  };

  const renderProgressBar = () => {
    const progress = (currentQuestion / sport.questions.length) * 100;
    return (
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
        <Text style={styles.progressText}>
          {currentQuestion + 1} / {sport.questions.length}
        </Text>
      </View>
    );
  };

  const getButtonColors = (option) => {
    if (selectedAnswer === option) {
      return isAnswerCorrect
        ? ['#00FF00', '#00CC00', '#009900'] // Green neon for correct
        : ['#FF0000', '#CC0000', '#990000']; // Red neon for incorrect
    }
    return ['#00FFFF', '#FF00FF', '#FF1493']; // Default neon colors
  };

  if (showResult) {
    return (
      <ImageBackground
        source={require('../../assets/image/bg/illuminatedArrow.jpg')}
        style={styles.backgroundImage}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <LinearGradient
            colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.3)']}
            style={styles.overlay}
          >
            <Text style={styles.resultText}>Quiz Completed!</Text>
            <Text style={styles.resultText}>Your Score: {score}/{sport.questions.length}</Text>
            {score >= 9 ? (
              <>
                <Text style={styles.resultText}>Congratulations! You've unlocked the next level!</Text>
                <Text style={styles.factText}>{sport.sportsmanFact}</Text>
              </>
            ) : (
              <>
                <Text style={styles.resultText}>You need 9 or more correct answers to unlock the next level.</Text>
                <Text style={styles.adviceText}>{sport.adviceOnLoss}</Text>
              </>
            )}
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
        </ScrollView>
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
          {renderProgressBar()}
          <View style={styles.questionContainer}>

          <Text style={styles.questionText}>{sport.questions[currentQuestion].question}</Text>
          </View>
          {sport.questions[currentQuestion].options.map((option, index) => (
            <Animated.View key={index} style={{ transform: [{ scale: buttonScale }] }}>
              <TouchableOpacity
                onPress={() => handleAnswer(option)}
                style={styles.button}
                disabled={selectedAnswer !== null}
              >
                <LinearGradient
                  colors={getButtonColors(option)}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.gradient}
                >
                  <Text style={styles.buttonText}>{option}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </LinearGradient>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({  
  questionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
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
  progressBarContainer: {
    width: '100%',
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#00FFFF',
  },
  progressText: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    color: '#FF1493',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
    width: width * 0.9,
    height: 60,
    marginBottom: 20,
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
    fontSize: 22,
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
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  factText: {
    fontSize: 18,
    color: '#00FFFF',
    marginBottom: 20,
    textAlign: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#00FFFF',
    borderRadius: 10,
  },
  adviceText: {
    fontSize: 18,
    color: '#FF00FF',
    marginBottom: 20,
    textAlign: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#FF00FF',
    borderRadius: 10,
  },
});

export default StackQuizLevelScreen;
