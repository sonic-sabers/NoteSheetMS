import React,
{
  useState,
} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  KeyboardAvoidingView,

  TouchableWithoutFeedback,
  Alert,
  ActivityIndicator,
  Keyboard

} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../constants';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Orderplaced() {
  return (
    <View style={{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:colors.secondary
    }}>
           <Text
                style={{
                  fontSize: 18,
                  fontWeight: '500',
                  color: colors.white,
                }}>
                Order Placed !!!
              </Text>
    </View>
  )
}

const styles = StyleSheet.create({})