/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
  Pressable,
  Modal,
  TextInput,
  Dimensions,
  Animated,
} from 'react-native';
import { Options } from '../screens';
import Hstack from '../component/Hstack';
import AntDesign from 'react-native-vector-icons/AntDesign';

const windowWidth = Dimensions.get('window').width;
function MyTabBar({ state, descriptors, navigation }) {
  // }));
  const [search, setSearch] = useState('');

  return (
    <View>
      <Hstack
        between
        styles={{
          padding: 10,
        }}>
        <Hstack
          centered
          styles={{
            height: 40,
            backgroundColor: '#fafafa',
            paddingLeft: 15,
            borderRadius: 5,
            borderWidth: 0.6,
            borderColor: '#cbae12',
            flex: 1,
          }}>
          <AntDesign
            name="search1"
            size={22}
            style={{ color: '#00000099', marginLeft: 0 }}
          />
          <TextInput
            // ref={searchRef}
            placeholder="Search notesheet here..."
            style={{ flex: 1, marginLeft: 4, fontSize: 14 }}
            value={search}
            onChangeText={txt => {
              // searchFilterFunction(txt);
              setSearch(txt);
            }}
          />
        </Hstack>
        <TouchableOpacity
          style={{
            height: 40,
            width: 40,
            marginHorizontal: 10,
            backgroundColor: '#0b0aa230',
            borderRadius: 50,
          }}
        />
      </Hstack>
      <View
        style={{
          flex: 0,
          height: 40,
          flexDirection: 'row',
          backgroundColor: '#ffffff',
          borderBottomColor: '#ffffff',
          borderBottomWidth: 1,
        }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate({ name: route.name, merge: true });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={route.name}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomColor: isFocused ? '#2A69AC' : 'transparent',
                borderBottomWidth: 1,
                marginBottom: -1,
              }}>
              <Animated.Text
                style={{
                  flex: 0,
                  width: windowWidth / 3,
                  textAlign: 'center',
                  // ...subTextThic,
                  color: isFocused ? '#2A69AC' : '#00000050',
                }}>
                {label}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

function FeedScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Feed!</Text>
    </View>
  );
}

function NotificationsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications!</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile!</Text>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="All"
      screenOptions={{
        lazy: true,
        showIcon: false,
        activeTintColor: '#080808',
      }}
      tabBar={props => <MyTabBar theme {...props} />}
      sceneContainerStyle={{ backgroundColor: '#bceaba20' }}
      initialLayout={{
        width: Dimensions.get('window').width,
        // backgroundColor: theme?.card_bg || '#fff',
        backgroundColor: '#ffffff',
      }}>
      <Tab.Screen
        name="C2"
        // component={Options}
        children={() => <Options showbuttons/>}
        options={{
          tabBarLabel: 'C2',
          // tabBarItemStyle: { width: 10 },
          tabBarItemStyle: { minWidht: '10', backgroundColor: 'red' },
          tabBarContentContainerStyle: { minWidht: '10', backgroundColor: 'red' },
        }}
      />
      <Tab.Screen
        name="All"
        component={Options}
        options={{
          tabBarLabel: 'All',
          tabBarBounces: true,
          tabBarItemStyle: {
            backgroundColor: 'red',
            flex: 1,
          },
          tabBarStyle: {
            backgroundColor: 'red',
            flex: 1,
          },
        }}
      />
      <Tab.Screen
        name="Approved"
        component={Options}
        options={{ tabBarLabel: 'Approved' }}
      />
      <Tab.Screen
        name="Pending"
        component={Options}
        options={{ tabBarLabel: 'Pending' }}
      />
      <Tab.Screen
        name="Others"
        component={ProfileScreen}
        options={{ tabBarLabel: 'Others' }}
      />
    </Tab.Navigator>
  );
}
export default function Root() {
  return <MyTabs />;
}
