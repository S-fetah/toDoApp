import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import React, {useRef, useState} from 'react';
import logo from '../assets/Logo.png';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../types';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {addTask, connectToDb, createTable} from '../../android/app/db/db';

type TaskPopUpPropType = NativeStackScreenProps<RootStackParams, 'TaskPopUp'>;

export default function TaskPopUp({navigation}: TaskPopUpPropType) {
  const [task, setTask] = useState<string>('');
  const inputRef = useRef<TextInput>(null);
  const [subTasks, setSubTaks] = useState<string[]>([]);
  const handleChange = async (text: string) => {
    setTask(text);
  };
  const handleSubTasks = (text: string) => {
    console.log(inputRef.current);
    setSubTaks([text, text, text]);
  };
  const handleAdd = async () => {
    const db = await connectToDb();
    const table = await createTable(db);
    if (table) {
      await addTask(task);
    }

    // await deleteTable(db);
    await addTask('nchlh tmchi', 'lwla,zawja,taltha,');
  };

  const handleCancel = () => {
    navigation.navigate('List');
  };
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaProvider>
          <View style={styles.picContainer}>
            <Image source={logo} style={styles.pic} />
          </View>
          <SafeAreaView style={styles.popup}>
            <Text style={styles.header}>Please Add Your New Task : </Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange}
              value={task}
              placeholder="e.g. Buy groceries"
            />
            <Text style={styles.header}>Sub Tasks : (*optional) </Text>
            <TextInput
              style={styles.input}
              onChangeText={handleSubTasks}
              value={subTasks[0]}
              ref={inputRef}
              placeholder="e.g. Buy milk"
              id={'1'}
            />
            <TextInput
              style={styles.input}
              onChangeText={handleSubTasks}
              value={subTasks[1]}
              ref={inputRef}
              placeholder="e.g. Buy eggs"
              id={'2'}
            />
            <TextInput
              style={styles.input}
              onChangeText={handleSubTasks}
              value={subTasks[2]}
              placeholder="e.g. Buy bread"
              ref={inputRef}
              id={'3'}
            />
            <View style={styles.btnContainer}>
              <TouchableOpacity onPress={handleCancel}>
                <Text style={styles.buttons}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleAdd}>
                <Text style={styles.buttons}>Add</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </SafeAreaProvider>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  popup: {
    backgroundColor: '#FBFAF8',
    width: '100%',
    height: '80%',
    flex: 1,
    alignItems: 'center',
    padding: 30,
    rowGap: 20,
  },
  header: {
    fontSize: 18,
    color: '#111111',
    fontWeight: '500',
    letterSpacing: -1,
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
  input: {
    fontSize: 15,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ccc',
    height: 'auto',
    width: '100%',
    borderRadius: 15,
    padding: 15,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: 25,
    marginTop: 20,
  },
  picContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#FBFAF8',
    height: 120,
    marginTop: 30,
    marginBottom: -60,
    zIndex: 10,
    textAlign: 'center',
  },
  pic: {
    width: '70%',
    height: 80,
    marginTop: 30,
    marginLeft: -10,
  },
});
