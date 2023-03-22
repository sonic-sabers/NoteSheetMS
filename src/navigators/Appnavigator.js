import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {CreateNotesheet, DetailedNote} from '../screens';
import {Rootnavigator} from '.';

const Stack = createStackNavigator();

function Appnavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Rootnavigator">
      <Stack.Screen name="Rootnavigator" component={Rootnavigator} />
      <Stack.Screen
        name="Detailednote"
        options={({route}) => ({
          title: 'Note Sheet details',
          headerShown: 'true',
        })}
        component={DetailedNote}
      />
      <Stack.Screen
        name="CreateNotesheet"
        options={({route}) => ({
          title: 'Create Note Sheet',
          headerShown: 'true',
        })}
        component={CreateNotesheet}
      />
    </Stack.Navigator>
  );
}

export default Appnavigator;
