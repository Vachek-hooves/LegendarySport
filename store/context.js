import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { quiz } from '../data/quiz';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [highScore, setHighScore] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [quizData, setQuizData] = useState([]);

  useEffect(() => {
    loadGameData();
    initializeQuizData();
  }, []);

  const loadGameData = async () => {
    try {
      const storedHighScore = await AsyncStorage.getItem('highScore');
      const storedTotalPoints = await AsyncStorage.getItem('totalPoints');
      
      if (storedHighScore !== null) {
        setHighScore(parseInt(storedHighScore));
      }
      if (storedTotalPoints !== null) {
        setTotalPoints(parseInt(storedTotalPoints));
      } else {
        // Initialize totalPoints to 0 if it doesn't exist
        await AsyncStorage.setItem('totalPoints', '0');
      }
    } catch (error) {
      console.error('Error loading game data:', error);
    }
  };

  const initializeQuizData = async () => {
    try {
      const storedQuizData = await AsyncStorage.getItem('quizData');
      if (storedQuizData === null) {
        const updatedQuizData = quiz.map((sport, index) => ({
          ...sport,
          isActive: index === 0 // Set isActive to true for the first object, false for others
        }));
        await AsyncStorage.setItem('quizData', JSON.stringify(updatedQuizData));
        setQuizData(updatedQuizData);
      } else {
        setQuizData(JSON.parse(storedQuizData));
      }
    } catch (error) {
      console.error('Error initializing quiz data:', error);
    }
  };

  const updateGameData = async (score) => {
    try {
      const pointsEarned = score * 10; // 10 points per goal
      const newTotalPoints = totalPoints + pointsEarned;
      setTotalPoints(newTotalPoints);
      await AsyncStorage.setItem('totalPoints', newTotalPoints.toString());

      if (score > highScore) {
        setHighScore(score);
        await AsyncStorage.setItem('highScore', score.toString());
      }
    } catch (error) {
      console.error('Error saving game data:', error);
    }
  };

  const updateQuizData = async (newQuizData) => {
    try {
      await AsyncStorage.setItem('quizData', JSON.stringify(newQuizData));
      setQuizData(newQuizData);
    } catch (error) {
      console.error('Error updating quiz data:', error);
    }
  };

  const value = {
    highScore,
    totalPoints,
    quizData,
    updateGameData,
    loadGameData,
    updateQuizData
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};
