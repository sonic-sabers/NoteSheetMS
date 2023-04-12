import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CreateNotesheet, DetailedNote, Userprofile, Forwardscreen } from '../screens';
import { Rootnavigator } from '.';
import { StatusBar } from 'react-native';
import { colors } from '../constants';
import α from 'color-alpha';

const Stack = createStackNavigator();

function Appnavigator() {
  return (
    <>
      <StatusBar animated={true} backgroundColor={α(colors.primary, 0.4)} />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Rootnavigator">
        <Stack.Screen name="Rootnavigator" component={Rootnavigator} />
        <Stack.Screen
          name="Detailednote"
          options={({ route }) => ({
            title: 'Note Sheet details',
            headerShown: 'true',
          })}
          component={DetailedNote}
        />
        <Stack.Screen
          name="CreateNotesheet"
          options={({ route }) => ({
            title: 'Create Note Sheet',
            headerShown: 'true',
          })}
          component={CreateNotesheet}
        />
        <Stack.Screen
          name="Userprofile"
          options={({ route }) => ({
            title: 'Create Note Sheet',
            // headerShown: 'true',
          })}
          component={Userprofile}
        />
        <Stack.Screen
          name="Forwardscreen"
          options={({ route }) => ({
            title: 'Forward Note Sheet',
            headerShown: 'true',
          })}
          component={Forwardscreen}
        />
      </Stack.Navigator>
    </>

  );
}

export default Appnavigator;
