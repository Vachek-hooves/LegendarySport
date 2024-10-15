import React from 'react';
import { StyleSheet, Text, View, ScrollView, ImageBackground, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { training } from '../../data/training';

const StackTrainingDetailScreen = ({ route }) => {
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
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.4)']}
        style={styles.overlay}
      >
        <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.title}>{selectedTraining.title}</Text>
            <Text style={styles.description}>{selectedTraining.description}</Text>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  );
};

export default StackTrainingDetailScreen;

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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
    color: 'white',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: 'white',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
