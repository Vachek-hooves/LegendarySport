import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import { training } from '../../data/training';

const StackTrainingProgramScreen = ({ route }) => {
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default StackTrainingProgramScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  goalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  goalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  exerciseText: {
    fontSize: 16,
    marginLeft: 10,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 10,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
