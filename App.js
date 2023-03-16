// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// export default function App() {
//   return (
//     <View>
//       <Text>Apcdcsp</Text>
//     </View>
//   )
// }

// const styles = StyleSheet.create({})

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Rootnavigator, Appnavigator } from './src/navigators';
import { Loginscreen } from './src/screens';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Appnavigator">
        <Stack.Screen name="Authnavigator" component={Loginscreen} />
        <Stack.Screen name="Appnavigator" component={Appnavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;