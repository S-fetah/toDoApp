import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import Task, {taskType} from '../components/Task';
import Psign from '../assets/Psign.png';

import {RootStackParams} from '../types';
import {connectToDb, getTable} from '../../android/app/db/db';

type listScreenProps = Readonly<
  NativeStackScreenProps<RootStackParams, 'List'>
>;

function ListScreen({navigation}: listScreenProps) {
  const [tasks, setTasks] = useState<taskType[]>([]);

  const fetchTasks = useCallback(async () => {
    const db = await connectToDb();
    const getTasks = await getTable(db);
    setTasks(getTasks);
  }, []);
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView style={styles.safeContainer}>
        <View>
          <Text style={styles.headerText}> Tasked</Text>
        </View>
        <ScrollView>
          <View>
            {tasks.length > 0 &&
              tasks.map(ele => {
                return <Task task={ele} key={ele.title} />;
              })}
          </View>
        </ScrollView>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.navigate('TaskPopUp')}>
          <Image source={Psign} style={styles.btnImage} />
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 'auto',
    height: '100%',
    padding: 20,
    position: 'relative',
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
    marginTop: 54,
    paddingBottom: 25,
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
});
export default ListScreen;
