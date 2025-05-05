import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import ChildrenTasks from './ChildrenTasks';

type taskTypes = {
  task: string;
  children?: string[];
};
const Task = ({task, children}: taskTypes) => {
  const [checked, setChecked] = useState<boolean>(false);
  return (
    <>
      <View style={styles.view}>
        <BouncyCheckbox
          size={23}
          fillColor="#111111"
          unFillColor="#FFFFFF"
          text={task}
          textStyle={styles.text}
          iconStyle={styles.iconStyle}
          innerIconStyle={styles.iconStyle}
          isChecked={checked}
          onPress={() => {
            setChecked(prev => !prev);
          }}
          iconComponent={<View />}
        />
      </View>
      {children?.map((item, index) => (
        <ChildrenTasks smallTask={item} key={item + index} />
      ))}
    </>
  );
};

export default Task;

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: '#111111',
    fontWeight: '400',
    textAlign: 'left',
    letterSpacing: -0.17,
  },
  view: {
    maxWidth: 375,
    maxHeight: 76,
    marginBottom: 15,
    marginTop: 15,
    marginLeft: 24,
  },
  iconStyle: {borderRadius: 5, borderWidth: 2},
});
