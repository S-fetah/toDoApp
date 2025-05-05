import React from 'react';
import Main from './src/Main';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParams} from './src/types';
import ListScreen from './src/screens/ListScreen';
import TaskPopUp from './src/components/TaskPopUp';

const Stack = createNativeStackNavigator<RootStackParams>();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="List"
          component={ListScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TaskPopUp"
          component={TaskPopUp}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
