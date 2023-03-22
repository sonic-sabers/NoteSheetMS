import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Rootnavigator, Appnavigator} from './src/navigators';
import {Loginscreen} from './src/screens';
import {SafeAreaView, StatusBar} from 'react-native';

const Stack = createStackNavigator();

function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        animated={true}
        backgroundColor="#3182CE90"
      />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Loginscreen">
          <Stack.Screen name="Authnavigator" component={Loginscreen} />
          <Stack.Screen name="Appnavigator" component={Appnavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
