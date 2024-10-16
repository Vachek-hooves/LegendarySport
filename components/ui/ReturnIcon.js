import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const ReturnIcon = () => {
  const navigator = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigator.goBack()}>
      <Image
        source={require('../../assets/icons/return.png')}
        style={{ width: 60, height: 50 }}
      />
    </TouchableOpacity>
  );
};

export default ReturnIcon;

const styles = StyleSheet.create({});
