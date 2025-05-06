import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  ViewComponent,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import Task, {taskType} from '../components/Task';
import Psign from '../assets/Psign.png';
import bin from '../assets/gifs/binGif.png';
import toDoIcon from '../assets/gifs/to-do-icon.png';
import {RootStackParams} from '../types';
import {
  connectToDb,
  createTable,
  deleteTable,
  getTable,
} from '../../android/app/db/db';
import {SQLiteDatabase} from 'react-native-sqlite-storage';

type listScreenProps = Readonly<
  NativeStackScreenProps<RootStackParams, 'List'>
>;

function ListScreen({navigation}: listScreenProps) {
  const [db, setDb] = useState<SQLiteDatabase | null | undefined>();
  const [tasks, setTasks] = useState<taskType[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  const toggleModal = () => {
    if (db && tasks.length > 0) {
      return setModal(true);
    }
  };
  const fetchTasks = useCallback(async () => {
    const conDb = await connectToDb();
    await createTable(conDb);
    let getTasks = await getTable(conDb);
    setDb(conDb);
    setTasks(getTasks);
  }, []);
  const handleCancel = () => {
    setModal(!modal);
  };
  const handleAdd = () => {
    handleClearTasks();
    setModal(!modal);
  };
  const handleClearTasks = async () => {
    if (db) {
      await deleteTable(db);
      await createTable(db);
      const emptyTasks = await getTable(db);
      setTasks(emptyTasks);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);
  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.title}>
          <Text style={styles.headerText}> Tasked</Text>
          <TouchableOpacity onPress={toggleModal}>
            <Image source={bin} style={styles.clearIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.thinLine} />
        <ScrollView>
          <View>
            {tasks.length > 0 ? (
              tasks.map(ele => {
                return <Task task={ele} key={ele.title} />;
              })
            ) : (
              <View>
                <Image source={toDoIcon} style={styles.toDoIconStyles} />
                <Text style={styles.todoText}>
                  {' '}
                  You have no tasks Currently .... ✍📝
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.navigate('TaskPopUp')}>
          <Image source={Psign} style={styles.btnImage} />
        </TouchableOpacity>
        <Modal visible={modal} animationType="fade" transparent={true}>
          <View style={styles.modalStyles}>
            <Text style={styles.modalText}>
              {' '}
              Do you want to clear all tasks ? 🧺
            </Text>
            <View style={styles.btnContainer}>
              <TouchableOpacity onPress={handleCancel}>
                <Text style={styles.buttons}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleAdd}>
                <Text style={styles.buttons}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
      {/* {modal && <View style={styles.coverAll} />} */}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 'auto',
    height: '100%',
    padding: 20,
    position: 'relative',
    backgroundColor: 'white',
    // opacity: 0.1,
  },
  safeContainer: {
    width: '95%',
    position: 'relative',
    height: '100%',
    textAlign: 'center',
  },
  headerText: {
    fontSize: 42,
    // lineHeight: 100,
    fontWeight: '700',
    marginTop: 24,
    paddingBottom: 10,
    width: 'auto',
  },
  addBtn: {
    position: 'absolute',
    bottom: '8%',
    right: -10,
    padding: 20,
  },
  btnImage: {
    width: 70,
    height: 70,
  },
  clearIcon: {
    height: 30,
    width: 25,
    marginTop: 35,
  },
  thinLine: {
    height: 1,
    width: '100%',
    backgroundColor: '#111111',
    marginBottom: 15,
  },
  title: {flexDirection: 'row', justifyContent: 'space-between'},
  toDoIconStyles: {
    top: 255,
    left: 125,
  },
  todoText: {
    fontWeight: 'bold',
    fontSize: 15,
    top: 260,
    left: 70,
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
    columnGap: 15,
  },
  modalStyles: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    height: 200,
    top: 310,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1.25,
    shadowRadius: 5,
    elevation: 12,
    justifyContent: 'space-between',
  },
  modalText: {
    fontSize: 18,
    fontWeight: '500',
    // fontFamily: 'Ariel',
  },
  coverAll: {
    width: '100%',
    height: '100%',
    zIndex: 10,
    backgroundColor: '#fefefe',
    position: 'absolute',
  },
});
export default ListScreen;
