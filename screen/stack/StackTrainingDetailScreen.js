import React from 'react';
import { StyleSheet, Text, View, ScrollView, ImageBackground, SafeAreaView, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { training } from '../../data/training';
import { useNavigation } from '@react-navigation/native';

const StackTrainingDetailScreen = ({ route }) => {
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
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.4)']}
        style={styles.overlay}
      >
        <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.title}>{selectedTraining.title}</Text>
            <Text style={styles.description}>{selectedTraining.description}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('StackTrainingProgramScreen', { trainingId: selectedTraining.id })}
              style={styles.buttonContainer}
            >
              <LinearGradient
                colors={['#00FFFF', '#FF00FF', '#FF1493']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>View Detailed Program</Text>
              </LinearGradient>
            </TouchableOpacity>
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
    marginBottom: 20,
  },
  buttonContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 20,
  },
  returnButtonContainer: {
    marginTop: 10, // Add some space between the buttons
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
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  spacer: {
    height: 20,
  },
});
