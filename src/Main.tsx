import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import logo from './assets/Logo.png';
import {RootStackParams} from './types';
type mainScreenProps = NativeStackScreenProps<RootStackParams, 'Main'>;
function Main({navigation}: mainScreenProps) {
  const handlePress = () => navigation.navigate('List');

  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.main}>
        <Image source={logo} style={styles.logo} />
        <Text> Your Daily Tasks Schedular App</Text>
      </View>
      <TouchableOpacity onPress={handlePress} style={styles.btn}>
        <Text style={styles.text}> {'>'} </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  area: {
    width: 'auto',
    height: '100%',
    backgroundColor: '#FBFAF8',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  logo: {
    width: 450,
    height: 100,
  },
  btn: {
    backgroundColor: '#FF5A60',
    width: 70,
    height: 70,
    alignSelf: 'flex-end',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: '50%',
    borderColor: '#FF5A60',
    marginBottom: 25,
  },
  text: {
    fontSize: 35,
    color: 'white',
    textAlign: 'center',
    lineHeight: 65,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Main;
