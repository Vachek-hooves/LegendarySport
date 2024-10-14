import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAppContext } from '../../store/context';
import LinearGradient from 'react-native-linear-gradient';
const TabQuizScreen = ({ navigation }) => {
  

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
          
        </LinearGradient>
      </View>
    </ImageBackground>
  );
}

export default TabQuizScreen

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})