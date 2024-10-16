import { StyleSheet, View, Image } from 'react-native';

const SoundIcon = ({ isPlay }) => {
  return (
    <View
      style={[
        styles.harpContainer,
        {
          backgroundColor: isPlay ? '#FF1493' : '#00FFFF',
          padding: 10,
          borderRadius: 50,
        },
      ]}
    >
      <Image
        // source={require('../../assets/image/sound/soundCircle.png')}
        source={require('../../assets/image/sound/soundImage.png')}
        style={[styles.harpImage, { width: 60, height: 70, borderRadius: 30 }]}
        resizeMode="contain"
      />
    </View>
  );
};

export default SoundIcon;

const styles = StyleSheet.create({
  harpContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderWidth: 2,
    borderColor: '#CD7F32', // Bronze color for border
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'absolute',
    left: -20,
  },
});
