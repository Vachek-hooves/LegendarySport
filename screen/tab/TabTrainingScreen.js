import React from 'react';
import { StyleSheet, Text, View, ImageBackground, FlatList, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { training } from '../../data/training';
import { useNavigation } from '@react-navigation/native';

const TabTrainingScreen = () => {
  const navigation = useNavigation();

  const renderCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('StackTrainingDetailScreen', { trainingId: item.id })}
    >
      <Image source={item.image} style={styles.cardImage} />
      <LinearGradient
        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.8)']}
        style={styles.cardOverlay}
      >
        <Text style={styles.cardTitle}>{item.type}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require('../../assets/image/bg/training.png')}
      style={styles.backgroundImage}
      blurRadius={100}
    >   
      <View style={styles.container}>
        <LinearGradient
          colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.3)']}
          style={styles.overlay}
        >
          <SafeAreaView/>
          <Text style={styles.title}>Choose a Sport</Text>
          <FlatList
            data={training}
            renderItem={renderCard}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={styles.cardList}
          />
        </LinearGradient>
      </View>
    </ImageBackground>
  );
};

export default TabTrainingScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  cardList: {
    paddingBottom: 20,
  },
  card: {
    flex: 1,
    margin: 10,
    height: 180,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    justifyContent: 'flex-end',
    padding: 10,
  },
  cardTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
