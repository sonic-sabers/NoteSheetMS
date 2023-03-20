import React,
{
  Component,
  useState,
  useEffect,
  useRef
} from 'react';
import {
  StyleSheet,
  Button,
  Image,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
  ImageBackground,
  FlatList,
  ViewPropTypes,
  Switch,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import {colors} from '../../constants';


export default function CreateNotesheet() {
  return (
    <View style={{
      flex: 1,
      padding: 10,

    }}>
      <Text>CreateNotesheet</Text>
    </View>
  )
}

const styles = StyleSheet.create({})