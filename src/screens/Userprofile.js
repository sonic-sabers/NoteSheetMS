/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Modal,
  PermissionsAndroid,
  Alert,
  TouchableWithoutFeedback,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import { Hstack, KeyboardavoidingWrapper, ImagePicker } from '../../components';
// import { colors } from '../../constants';

import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Yup from 'yup';

import { Dimensions } from 'react-native';
import { colors } from '../constants';
import Hstack from '../component/Hstack';
import { Formik } from 'formik';
import KeyboardavoidingWrapper from '../component/KeyboardavoidingWrapper';
const { width, height } = Dimensions.get('window');

const Styledtextinput = props => {
  const [text, onChangeText] = React.useState('');

  // const [text, onChangeText] = React.useState("");
  // https://godconnect.online/api/UserMgmtAPI/ProfileCheck
  const [hidePass, setHidePass] = React.useState(true);
  const navigation = useNavigation();
  const inputRef = React.useRef();

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          // height: 40,
          marginHorizontal: 5,
          borderBottomWidth: 1,
          borderColor: colors.lightblack,
          alignItems: 'center',
          marginTop: 10,
          // paddingBottom:10,
        }}>
        <FontAwesome
          name="user-circle"
          size={22}
          color={colors.primary}
          style={
            {
              // marginBottom: -10
            }
          }
        />

        <TextInput
          style={{
            // marginLeft: 5,
            fontWeight: '600',
            fontSize: 19,
            // marginBottom: -10,
            color: colors.lightblack,
            flex: 1,
            marginLeft: 10,
            marginTop: 5,
          }}
          ref={inputRef}
          value={text}
          // secureTextEntry={hidePass ? true : false}

          placeholder={props.lable}
          // placeholderTextColor={colors.lightblack}
          placeholderTextColor="#000"
          // autoCapitalize="none"
          {...props}
        />
        {props.edit && (
          <TouchableOpacity onPress={() => inputRef.current.focus()}>
            <Feather
              name="edit"
              size={20}
              color={colors.primary}
              style={{
                marginLeft: 0,
              }}
            />
          </TouchableOpacity>
        )}
      </View>
      <Hstack between>
        {props.error ? (
          <Text
            style={{
              color: 'red',
              fontSize: 13.5,
              marginBottom: -10,
              marginLeft: 11,
            }}>
            {props.error}
          </Text>
        ) : (
          <Text
            style={{
              color: 'red',
              fontSize: 13.5,
              marginBottom: -10,
              marginLeft: 11,
            }}
          />
        )}
      </Hstack>
    </View>
  );
};

export default function Userprofile({ route, navigation }) {
  const [NMSid, setNMSid] = useState('');
  const [Name, onChangeName] = useState('');
  const [Lastname, onChangeLastname] = useState('');
  const [Phone, onChangePhone] = useState('Mobile number here');
  const [Position, onChangePosition] = useState('Assistant Professor');
  const [School, setSchool] = useState('SCSE');
  const [Department, setDepartment] = useState('CSE');

  const [dataRestored, setDataRestored] = useState(false);
  const [Gender, setGender] = useState('');
  const [Newdata, setNewdata] = useState(null);
  const [newdata, Setnewdata] = useState({
    // });
    Name: '',
    Lastname: '',
    Gender: '',
    NMSid: 'Lorem-NMS-ID',
    email: '',
    Position: 'Assistant Professor',
    School: 'SCSE',
    Department: 'CSE',
  });
  // const [UserInfo, SetUserInfo] = useState();

  var UserInfo = {
    Name: '',
    Lastname: '',
    // Gender: '',
    NMSid: 'Lorem-NMS-ID',
    email: '',
    Position: 'Assistant Professor',
    School: 'SCSE',
    Department: 'CSE',
  };

  const regex = /^(?:\d{10}|\w+@\w+\.\w{2,3})$/;
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const validationSchema = Yup.object({
    Name: Yup.string()
      .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
      .max(40)
      .required(),
    Lastname: Yup.string()
      .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
      .max(40)
      .required(),
    NMSid: Yup.string()
      .required('required')
      .matches(/[A-Z0-9]{16}/, 'NMS id is not valid')
      .min(16, 'to short')
      .max(16, 'to long'),
    email: Yup.string()
      .trim()
      .email('Invalid email format')
      .min(6, 'Minimum 6 characters is required')
      .required('Required'),
  });

  return (
    <ScrollView style={{ flex: 1 }}>
      {/* <KeyboardavoidingWrapper
        styles={{
          paddingBottom: 60,
          height: '100%',

        }}
        style={{
          flex: 1,
          backgroundColor: colors.white,
          height: '100%',
        }}> */}
      <View
        style={{
          flex: 1,
          backgroundColor: colors.white,
        }}
        contentContainerStyle={{
          flex: 1,
          backgroundColor: colors.white,
          // marginBottom: 70
        }}>
        <View
          style={[
            {
              margin: 5,
              borderRadius: 5,
              // paddingHorizontal: 5,
              paddingBottom: 10,
              marginVertical: 10,
            },
          ]}>
          <Hstack centered between>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={
                {
                  // width: 20,
                }
              }>
              <Feather name="chevron-left" size={35} color={colors.primary} />
            </TouchableOpacity>
            <View
              style={{
                flex: 1,
                // backgroundColor: 'green'
              }}>
              <Text
                style={{
                  fontSize: 25,
                  // fontWeight: '700',
                  // fontFamily: 'Roboto',
                  color: colors.lightblack,
                  marginLeft: -30,
                  flex: 1,
                  alignSelf: 'center',
                }}>
                User Profile
              </Text>
            </View>
          </Hstack>
        </View>

        <View
          style={{
            flex: 1,

            // marginTop: 0,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            paddingHorizontal: 20,
            // backgroundColor: '#00000005'
          }}>
          <View
            style={{
              alignItems: 'center',
              // marginTop: -35
              flex: 1,
            }}>
            <Hstack
              styles={{
                alignItems: 'flex-end',
              }}>
              <View
                style={{
                  height: 80,
                  width: 80,
                  borderRadius: 90,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: colors.primary,
                  borderWidth: 5,
                  borderColor: colors.white,
                  marginRight: -10,
                }}
              />
              <TouchableOpacity
                style={{
                  marginRight: -10,
                  // marginTop: 50,
                }}
                onPress={() =>
                  // setHelpnSupports(true)
                  null
                }>
                <Feather
                  name="edit"
                  size={20}
                  color={colors.primary}
                  style={{}}
                />
              </TouchableOpacity>
            </Hstack>
          </View>
          <Formik
            // initialValues={UserInfo}
            initialValues={newdata ? newdata : UserInfo}
            enableReinitialize={true}
            onSubmit={(values, formikActions) => {
              // Updateprofile(values);
              setTimeout(() => {
                // console.log(values);
                // formikActions.resetForm();
                formikActions.setSubmitting(false);
              }, 1000);
            }}
            validationSchema={validationSchema}>
            {({
              values,
              errors,
              touched,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => {
              {
              }
              const {
                Name,
                Lastname,

                NMSid,
                email,
                EmailId,
              } = values;
              return (
                <>
                  {/* {console.log('newdata', newdata)} */}
                  <Styledtextinput
                    value={Name}
                    placeholder="Enter Your First Name"
                    placeholderTextColor={colors.lightblack}
                    autoCapitalize="none"
                    // edit
                    autoComplete="name"
                    MaterialCommunityIcons
                    error={touched.Name && errors.Name}
                    onChangeText={handleChange('Name')}
                    onBlur={handleBlur('Name')}
                    // returnKeyType="next"
                    blurOnSubmit={false}
                  />
                  <Styledtextinput
                    value={Lastname}
                    placeholder="Enter Your Last Name"
                    placeholderTextColor={colors.lightblack}
                    autoCapitalize="none"
                    // edit/
                    autoComplete="name"
                    MaterialCommunityIcons
                    error={touched.Lastname && errors.Lastname}
                    onChangeText={handleChange('Lastname')}
                    onBlur={handleBlur('Lastname')}
                    blurOnSubmit={false}
                  />
                  <Styledtextinput
                    value={NMSid}
                    placeholder="Your NMS id"
                    placeholderTextColor={colors.lightblack}
                    autoCapitalize="characters"
                    maxLength={16}
                    keyboardType="email-address"
                    MaterialCommunityIcons
                    error={touched.NMSid && errors.NMSid}
                    onChangeText={handleChange('NMSid')}
                    onBlur={handleBlur('NMSid')}
                    blurOnSubmit={false}
                    autoCorrect={false}
                  />
                  <Styledtextinput
                    value={Position}
                    placeholder="+91 00000 00000"
                    placeholderTextColor={colors.lightblack}
                    autoCapitalize="none"
                    editable={false}
                    onChangeText={onChangePosition}
                  />
                  {/* Position: 'Assistant Professor',
    School: 'SCSE',
    Department: 'CSE', */}
                  <Styledtextinput
                    value={Phone}
                    placeholder="+91 00000 00000"
                    placeholderTextColor={colors.lightblack}
                    autoCapitalize="none"
                    editable={false}
                    onChangeText={setSchool}
                  />
                  <Styledtextinput
                    value={Department}
                    placeholder="+91 00000 00000"
                    placeholderTextColor={colors.lightblack}
                    autoCapitalize="none"
                    editable={false}
                    onChangeText={setDepartment}
                  />
                  <Styledtextinput
                    value={Phone}
                    placeholder="+91 00000 00000"
                    placeholderTextColor={colors.lightblack}
                    autoCapitalize="none"
                    editable={false}
                    onChangeText={onChangePhone}
                  />
                  <Styledtextinput
                    value={email}
                    placeholder="Enter Your Email address"
                    placeholderTextColor={colors.lightblack}
                    autoCapitalize="none"
                    edit
                    // onChangeText={onChangeEmail}
                    keyboardType="email-address"
                    MaterialCommunityIcons
                    error={touched.email && errors.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                  />
                  <TouchableOpacity
                    onPress={() => (
                      Alert.alert('Note Sheet is created'), navigation.goBack()
                    )}
                    style={{
                      // padding: 10,
                      backgroundColor: '#ca4b0b',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                      marginTop: 15,
                      opacity: 0.9,
                      height: 50,
                    }}>
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: '500',
                        color: '#fff',
                      }}>
                      Confirm
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Authnavigator')}
                    style={{
                      padding: 10,
                      backgroundColor: '#fff',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                      marginVertical: 15,
                      borderWidth: 1,
                      borderColor: '#999',
                      height: 50,
                    }}>
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: '500',
                        color: '#999',
                      }}>
                      Logout
                    </Text>
                  </TouchableOpacity>
                </>
              );
            }}
          </Formik>
          <View style={{ paddingBottom: 40 }} />
        </View>
      </View>
      {/* </KeyboardavoidingWrapper> */}
    </ScrollView>
  );
}
