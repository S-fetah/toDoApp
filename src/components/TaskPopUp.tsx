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
  StatusBar,
  Keyboard,
  Alert,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import logo from '../assets/Logo.png';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../types';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {addTask, connectToDb, createTable} from '../../android/app/db/db';

type TaskPopUpPropType = NativeStackScreenProps<RootStackParams, 'TaskPopUp'>;

type subtasksType = {
  first?: string;
  second?: string;
  third?: string;
};

export default function TaskPopUp({navigation}: TaskPopUpPropType) {
  const [task, setTask] = useState<string>('');
  const inputRef = useRef<TextInput>(null);
  const [subTasks, setSubTasks] = useState<subtasksType | null>({
    first: '',
    second: '',
    third: '',
  });
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const validateInput = (text: string): string => {
    return text.replace(/[,,'"]/g, '');
  };
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      e => {
        setKeyboardHeight(e.endCoordinates.height);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleChange = async (text: string) => {
    setTask(text);
  };

  const handleAdd = async () => {
    if (task.length < 3) {
      return Alert.alert('Please Provide A Valid Task 🤷‍♂️');
    }
    const db = await connectToDb();
    const table = await createTable(db);
    if (table) {
      const subtasksString = Object.values(subTasks || {})
        .filter(st => st && st.trim().length > 0)
        .join(',');

      if (subtasksString) {
        await addTask(task, subtasksString + ',');
        console.log(subtasksString);
      } else {
        await addTask(task);
      }
    }

    navigation.navigate('List');
  };

  const handleCancel = () => {
    navigation.navigate('List');
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View style={styles.picContainer}>
          <Image source={logo} style={styles.pic} />
        </View>

        <KeyboardAvoidingView
          style={styles.keyboardStyles}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 25}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
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
                onChangeText={(text: string) =>
                  setSubTasks({...subTasks, first: validateInput(text)})
                }
                value={subTasks?.first}
                placeholder="e.g. Buy milk"
              />
              <TextInput
                style={styles.input}
                onChangeText={(text: string) =>
                  setSubTasks({...subTasks, second: validateInput(text)})
                }
                value={subTasks?.second}
                placeholder="e.g. Buy eggs"
              />
              <TextInput
                style={styles.input}
                onChangeText={(text: string) =>
                  setSubTasks({...subTasks, third: validateInput(text)})
                }
                value={subTasks?.third}
                placeholder="e.g. Buy bread"
                ref={inputRef}
              />
              <View style={styles.btnContainer}>
                <TouchableOpacity onPress={handleCancel}>
                  <Text style={styles.buttons}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleAdd}>
                  <Text style={styles.buttons}>Add</Text>
                </TouchableOpacity>
              </View>

              <View style={{height: keyboardHeight > 0 ? 20 : 0}} />
            </SafeAreaView>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  popup: {
    backgroundColor: 'white',
    width: '100%',
    height: 'auto',
    alignItems: 'center',
    padding: 30,
    rowGap: 25,
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
    columnGap: 45,
    marginTop: 20,
  },
  picContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 'auto',
    textAlign: 'center',
    marginTop: 20,
  },
  pic: {
    width: '70%',
    height: 50,
    marginTop:
      Platform.OS === 'android' && StatusBar.currentHeight
        ? StatusBar.currentHeight + 10
        : 0,
    marginLeft: -10,
  },
  keyboardStyles: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
