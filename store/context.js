import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [highScore, setHighScore] = useState(0);
  const [totalGames, setTotalGames] = useState(0);

  useEffect(() => {
    loadGameData();
  }, []);

  const loadGameData = async () => {
    try {
      const storedHighScore = await AsyncStorage.getItem('highScore');
      const storedTotalGames = await AsyncStorage.getItem('totalGames');
      
      if (storedHighScore !== null) {
        setHighScore(parseInt(storedHighScore));
      }
      if (storedTotalGames !== null) {
        setTotalGames(parseInt(storedTotalGames));
      } else {
        // Initialize totalGames to 0 if it doesn't exist
        await AsyncStorage.setItem('totalGames', '0');
      }
    } catch (error) {
      console.error('Error loading game data:', error);
    }
  };

  const updateGameData = async (score) => {
    try {
      const newTotalGames = totalGames + 1;
      setTotalGames(newTotalGames);
      await AsyncStorage.setItem('totalGames', newTotalGames.toString());

      if (score > highScore) {
        setHighScore(score);
        await AsyncStorage.setItem('highScore', score.toString());
      }
    } catch (error) {
      console.error('Error saving game data:', error);
    }
  };

  const value = {
    highScore,
    totalGames,
    updateGameData,loadGameData
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
