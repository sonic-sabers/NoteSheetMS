/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Share,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import {colors} from '../../constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Hstack from '../component/Hstack';
import { Custombutton } from './Options';
import { colors } from '../constants';
import α from 'color-alpha';

const Detailes = ({ title, content, detail }) => {
  return (
    <View style={{ marginBottom: 10 }}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: '700',
          color: '#070707',
          marginTop: 5,
        }}>
        {title ? title : 'Subject'}
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: '#666666',
        }}>
        {detail?.length ? detail : content ? content : null}
      </Text>
    </View>
  );
};

const Sharenotesheet = ({ data }) => {
  const onShare = async data => {
    console.log('data', data);
    try {
      const result = await Share.share({
        message: `Subject: ${data?.Subject} \nAssignor: ${data?.assignor}\nEventData: ${data?.eventDate}\nStatus: ${data?.status}\nDescription: ${data?.description}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <TouchableOpacity
      onPress={() => onShare(data)}
      style={{
        height: 35,
        width: 35,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: α(colors.primary, 0.6),
        borderRadius: 10,
      }}>
      <Ionicons name="share-social-sharp" size={24} color="#fff" />
    </TouchableOpacity>
  );
};
export default function DetailedNote({ route }) {
  const navigation = useNavigation();
  const { item } = route.params;
  // console.log('item', item);

  return (
    <ScrollView style={{ flex: 1, padding: 15, backgroundColor: '#fff' }}>
      <Hstack centered between>
        <Detailes title="Date" content="24-04-2023" detail={item?.eventDate} />
        <Sharenotesheet data={item} />
      </Hstack>
      <Detailes title="School" content="School here Lorem" />
      <Detailes title="Department" content="Department here ipsum" />
      <Detailes title="Subject" content="Lorem School" detail={item?.Subject} />
      <Detailes title="Objective" content="Ipsum some Objective of the event" />
      <Detailes
        title="Details"
        content="There will be detailed information about the event in this place"
      />
      <Detailes
        title="Description"
        detail={item?.description}
        content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      />
      <Detailes
        title="Convener 1"
        detail={item?.assignor + ' 1'}
        content="Lorem ipsum"
      />
      <Detailes
        title="Convener 2"
        detail={item?.assignor + ' 2'}
        content="Lorem ipsum"
      />
      {item.isAvailable ? (
        <>
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
              title="Remark"
              color="#111"
              onPress={() => (
                navigation.goBack(), alert('Note sheet is Remarked')
              )}>
              <MaterialCommunityIcons
                name="message"
                size={24}
                style={{ color: '#dddf00', marginTop: 2 }}
              />
            </Custombutton>
            <Custombutton
              title="Meet"
              color="#111"
              onPress={() => (
                navigation.goBack(),
                alert('Notified converners to met in person')
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
              onPress={() => navigation.navigate('Forwardscreen')}>
              <MaterialCommunityIcons
                name="fast-forward"
                size={24}
                style={{ color: '#3182CE99', marginRight: 0 }}
              />
            </Custombutton>
          </Hstack>
        </>
      ) : (
        <Detailes
          title="Approved by"
          detail={
            'Status here : \n' + item.assignor + ',\nSome Approval faculty '
          }
          content="Status here"
        />
      )}
      <View style={{ paddingBottom: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
