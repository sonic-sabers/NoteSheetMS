/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {  } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import {colors} from '../../constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Hstack from '../component/Hstack';
import { Custombutton } from './Options';

export default function DetailedNote() {
  const Detailes = ({ title, content }) => {
    return (
      <View style={{ marginBottom: 10 }}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: '700',
            color: '#000',
            marginTop: 5,
          }}>
          {title ? title : 'Subject'}
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: '#666666',
          }}>
          {content ? content : null}
        </Text>
      </View>
    );
  };

  const navigation = useNavigation();
  return (
    <ScrollView style={{ flex: 1, padding: 10, backgroundColor: '#fff' }}>
      <Detailes title="School" content="Lorem" />
      <Detailes title="Department" content="ipsum" />
      <Detailes title="Date" content="24-04-2023" />
      <Detailes title="Subject" content="Lorem ipsum is simply dummy" />
      <Detailes title="Objective" content="Contrary to popular belief, " />
      <Detailes title="Details" content=" The first line of Lorem Ipsum" />
      <Detailes
        title="Description"
        content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      />
      <Detailes title="onvener 1" content="Lorem ipsum" />
      <Detailes title="onvener 1" content="Lorem ipsum" />
      <Text
        style={{
          fontSize: 15,
          fontWeight: '700',
          color: '#000',
          marginTop: 5,
        }}>
        Choose option
      </Text>
      <Hstack
        centered
        between
        styles={{
          // marginLeft: 10,
          marginBottom: 10,
          // flex: 1,
          // backgroundColor: 'red',
          marginTop: 10,
          width: Dimensions.get('window').width - 25,
          // flex: 1,
        }}>
        <Custombutton
          end
          title="Approve"
          color="#111"
          onPress={() => (
            navigation.goBack(), alert('Note sheet is approved')
          )}>
          <Feather
            name="check"
            size={24}
            style={{ color: '#2b9348', marginTop: 2 }}
          />
        </Custombutton>
        <Custombutton
          title="Reject"
          color="#111"
          onPress={() => (
            navigation.goBack(), alert('Note sheet is Rejected')
          )}>
          <Entypo
            name="cross"
            size={24}
            style={{ color: '#E53E3E', marginRight: 0 }}
          />
        </Custombutton>
        <Custombutton
          title="Meet"
          color="#111"
          onPress={() => (
            navigation.goBack(), alert('Notified converners to met in person')
          )}>
          <MaterialCommunityIcons
            name="account-clock-outline"
            size={24}
            style={{ color: '#DD6B20', marginRight: 0 }}
          />
        </Custombutton>
        <Custombutton
          end
          title="Fwd"
          color="#111"
          onPress={() => (navigation.goBack(), alert('To select to forward'))}>
          <MaterialCommunityIcons
            name="fast-forward"
            size={24}
            style={{ color: '#3182CE99', marginRight: 0 }}
          />
        </Custombutton>
      </Hstack>
      <View style={{ paddingBottom: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
