import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import ChildrenTasks from './ChildrenTasks';

type taskPropTypes = {
  task: taskType;
};
export type taskType = {
  title: string;
  SubTasks: string;
  status: string;
};
const Task = ({task}: taskPropTypes) => {
  const [checked, setChecked] = useState<boolean>(false);
  const {title, SubTasks, status}: taskType = task;
  const miniTasks = SubTasks?.split(',').filter(ele => ele && ele.length > 0);
  if (status !== 'Idle') {
    setChecked(true);
  }
  console.log(SubTasks);

  return (
    <>
      <View style={styles.view}>
        <BouncyCheckbox
          size={23}
          fillColor="#111111"
          unFillColor="#FFFFFF"
          text={title}
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
      {miniTasks?.length > 0 &&
        miniTasks?.map((item, index) => (
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
