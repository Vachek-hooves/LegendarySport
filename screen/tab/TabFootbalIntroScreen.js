import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const TabFootballIntroScreen = ({ navigation }) => {
  return (
    <View>
      <Text>TabFootballIntroScreen</Text>
      <SafeAreaView></SafeAreaView>
      <TouchableOpacity
        onPress={() => navigation.navigate('StackFootballPlay')}
      >
        <Text>Play </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TabFootballIntroScreen;

const styles = StyleSheet.create({});
