import {Image, StyleSheet, View} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import done from '../assets/correct.png';
import React, {useState} from 'react';

type ChildrenTasksProps = {
  smallTask: string;
};

const ChildrenTasks = ({smallTask}: ChildrenTasksProps) => {
  const [isDone, setIsDone] = useState<boolean>(false);

  return (
    <View style={styles.childrenStyle}>
      <BouncyCheckbox
        size={17}
        fillColor=""
        unFillColor="#FFFFFF"
        text={smallTask}
        textStyle={styles.text}
        isChecked={isDone}
        useBuiltInState
        onPress={() => setIsDone(prev => !prev)}
        iconComponent={
          isDone ? <Image source={done} style={styles.checkmarkImage} /> : null
        }
        innerIconStyle={isDone ? {borderWidth: 0} : {borderWidth: 1}}
        iconStyle={isDone ? {backgroundColor: 'transparent'} : ''}
      />
    </View>
  );
};

export default ChildrenTasks;

const styles = StyleSheet.create({
  childrenStyle: {
    width: '70%',
    marginLeft: 65,
    marginBottom: 15,
    // backgroundColor: '#FBFAF8',
  },
  text: {
    fontSize: 18,
    color: '#111111',
    fontWeight: '400',
    textAlign: 'left',
    letterSpacing: -0.17,
  },
  checkmarkImage: {
    width: 25,
    height: 30,
    resizeMode: 'cover',
  },
});
