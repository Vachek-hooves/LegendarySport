import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, ImageBackground, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { training } from '../../data/training';
import { useNavigation } from '@react-navigation/native';

const StackTrainingProgramScreen = ({ route }) => {
  const navigation = useNavigation();
  const { trainingId } = route.params;
  const selectedTraining = training.find(item => item.id === trainingId);

  if (!selectedTraining) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Training program not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <ImageBackground 
      source={selectedTraining.image} 
      style={styles.backgroundImage}
      blurRadius={2}
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.4)']}
        style={styles.overlay}
      >
        <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.title}>{selectedTraining.title} - Training Program</Text>
            {selectedTraining.trainingProgram.goals.map((goal, index) => (
              <View key={index} style={styles.goalContainer}>
                <Text style={styles.goalTitle}>{goal.name}</Text>
                <Text style={styles.sectionTitle}>Exercises:</Text>
                {goal.exercises.map((exercise, exIndex) => (
                  <Text key={exIndex} style={styles.exerciseText}>• {exercise}</Text>
                ))}
                <Text style={styles.sectionTitle}>Time and Frequency:</Text>
                <Text style={styles.infoText}>{goal.timeAndFrequency}</Text>
                <Text style={styles.sectionTitle}>Nutrition & Recovery:</Text>
                {goal.nutritionAndRecovery.map((item, nrIndex) => (
                  <Text key={nrIndex} style={styles.infoText}>• {item}</Text>
                ))}
              </View>
            ))}
            <View style={styles.spacer} />
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.buttonContainer}
            >
              <LinearGradient
                colors={['#FF1493', '#FF00FF', '#00FFFF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Return</Text>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  );
};

export default StackTrainingProgramScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
  },
  goalContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  goalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#00FFFF',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: '#FF00FF',
  },
  exerciseText: {
    fontSize: 16,
    marginLeft: 10,
    color: 'white',
  },
  infoText: {
    fontSize: 16,
    marginLeft: 10,
    color: 'white',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  spacer: {
    height: 20,
  },
  buttonContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
