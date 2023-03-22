import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Rootnavigator, Appnavigator} from './src/navigators';
import {Loginscreen} from './src/screens';
import {SafeAreaView, StatusBar} from 'react-native';
import α from 'color-alpha';
import { colors } from './src/constants';

const Stack = createStackNavigator();

function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar animated={true} backgroundColor={α(colors.primary, 0.4)} />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Authnavigator">
          <Stack.Screen name="Authnavigator" component={Loginscreen} />
          <Stack.Screen name="Appnavigator" component={Appnavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
