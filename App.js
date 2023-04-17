import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Appnavigator } from './src/navigators';
import { Loginscreen } from './src/screens';
import { SafeAreaView, StatusBar } from 'react-native';
import α from 'color-alpha';
import { colors } from './src/constants';
import { Provider } from 'react-redux';
import configureStore from './src/redux/store/configureStore';

// import configureStore from './store';

const store = configureStore()
const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar animated={true} backgroundColor={α(colors.primary, 0.4)} />
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
      </SafeAreaView>
    </Provider>
  );
}

export default App;
