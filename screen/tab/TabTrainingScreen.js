import { StyleSheet, Text, View,ImageBackground } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
const TabTrainingScreen = () => {
  return (
        <ImageBackground
      source={require('../../assets/image/bg/training.png')}
      style={styles.backgroundImage}
    >   
      <View style={styles.container}>
        <LinearGradient
          colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.3)']}
          style={styles.overlay}
        >
          <Text style={styles.title}>Choose a Sport</Text>
        </LinearGradient>
      </View>
    </ImageBackground>
  );
};



export default TabTrainingScreen

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
      },
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
      },
})