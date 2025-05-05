import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../types';

type TaskPopUpPropType = NativeStackScreenProps<RootStackParams, 'TaskPopUp'>;

export default function TaskPopUp({navigation}: TaskPopUpPropType) {
  const [task, setTask] = useState<string>('');
  const [subTasks, setSubTaks] = useState<string[]>([]);
  const handleChange = event => {
    const {name, type, text} = event;
    console.log(text);
    console.log(name);
    console.log(type);
    setTask(text);
  };

  const handleAdd = () => {};
  const handleCancel = () => {
    navigation.navigate('List');
  };
  return (
    <View style={styles.popup}>
      <Text style={styles.header}>Please Add Your New Task : </Text>

      <TextInput
        autoFocus={true}
        style={styles.input}
        onChange={handleChange}
        value={task}
      />
      <Text style={styles.header}>Sub Tasks : (*optional) </Text>
      <TextInput
        autoFocus={true}
        style={styles.input}
        onChangeText={handleChange}
        value={task}
      />
      <TextInput
        autoFocus={true}
        style={styles.input}
        onChangeText={handleChange}
        value={task}
      />

      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={handleCancel}>
          <Text style={styles.buttons}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAdd}>
          <Text style={styles.buttons}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  popup: {
    width: '100%',
    marginLeft: '5%',
    minHeight: '20%',
    flex: 1,
    zIndex: 100,
    borderWidth: 1,
    elevation: 30,
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#FBFAF8',
    borderColor: '#ccc',
    position: 'absolute',
    top: '15%',
    rowGap: 10,
  },
  header: {
    backgroundColor: '#FBFAF8',
    fontSize: 18,
    color: '#111111',
    fontWeight: '500',
    letterSpacing: -1,
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
  input: {
    backgroundColor: '#FBFAF8',
    fontSize: 15,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ccc',
    height: 'auto',
    padding: 10,
    width: '100%',
  },
  buttons: {
    fontSize: 16,
    width: 120,
    textAlign: 'center',
    color: 'white',
    backgroundColor: '#FF5A60',
    padding: 10,
    borderRadius: 10,
    fontWeight: '500',
  },
  btnContainer: {
    margin: 10,
    width: '90%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
