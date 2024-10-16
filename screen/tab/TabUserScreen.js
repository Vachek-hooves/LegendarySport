import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SoundControl from '../../components/bgSound/Control';

const TabUserScreen = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [image, setImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setName(parsedUser.name);
        setGender(parsedUser.gender);
        setImage(parsedUser.image);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const saveUserData = async () => {
    const userData = { name, gender, image };
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      setUser(userData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImage(response.assets[0].uri);
      }
    });
  };

  const renderForm = () => (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
      />
      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[styles.genderButton, gender === 'male' && styles.selectedGender]}
          onPress={() => setGender('male')}
        >
          <Text style={styles.genderText}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.genderButton, gender === 'female' && styles.selectedGender]}
          onPress={() => setGender('female')}
        >
          <Text style={styles.genderText}>Female</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.genderButton, gender === 'skip' && styles.selectedGender]}
          onPress={() => setGender('skip')}
        >
          <Text style={styles.genderText}>Skip</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
        <Text style={styles.buttonText}>Choose Profile Picture</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.saveButton} onPress={saveUserData}>
        <LinearGradient
          colors={['#00FFFF', '#FF00FF', '#FF1493']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <Text style={styles.buttonText}>Save</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  const renderUserInfo = () => (
    <View style={styles.userInfo}>
      <Image source={{ uri: image }} style={styles.profileImage} />
      <Text style={styles.userName}>{user.name}</Text>
      <Text style={styles.userGender}>{user.gender !== 'skip' ? user.gender : 'Not specified'}</Text>
      <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
        <LinearGradient
          colors={['#00FFFF', '#FF00FF', '#FF1493']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <Text style={styles.buttonText}>Edit Profile</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  const backgroundImage = gender === 'female' 
    ? require('../../assets/image/user/userShe.png')
    : gender === 'male'
    ? require('../../assets/image/user/userHe.png')
    : require('../../assets/image/bg/illuminatedArrow.jpg');

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <LinearGradient
        colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.3)']}
        style={styles.overlay}
      >
        <SafeAreaView/>
        <SoundControl/>
        <View style={styles.container}>
          {user && !isEditing ? renderUserInfo() : renderForm()}
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default TabUserScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    // mpaddingTop:30
    paddingTop:160
  },
  container: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  form: {
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#00FFFF',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: 'white',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  genderButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#FF00FF',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  selectedGender: {
    backgroundColor: 'rgba(255,0,255,0.3)',
  },
  genderText: {
    color: 'white',
  },
  imageButton: {
    width: '100%',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#FF1493',
    alignItems: 'center',
    marginBottom: 20,
  },
  saveButton: {
    width: '100%',
    overflow: 'hidden',
    borderRadius: 5,
  },
  gradient: {
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  userInfo: {
    alignItems: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00FFFF',
    marginBottom: 10,
  },
  userGender: {
    fontSize: 18,
    color: '#FF00FF',
    marginBottom: 20,
  },
  editButton: {
    width: '100%',
    overflow: 'hidden',
    borderRadius: 5,
  },
});
