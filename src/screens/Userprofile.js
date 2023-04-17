/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
// import { Hstack, KeyboardavoidingWrapper, ImagePicker } from '../../components';
// import { colors } from '../../constants';

import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Yup from 'yup';
import ToggleSwitch from 'toggle-switch-react-native';
import α from 'color-alpha';
import { useSelector, useDispatch } from 'react-redux';
import { changeCount } from '../redux/actions/counts';
import { colors } from '../constants';
import Hstack from '../component/Hstack';
import { Formik } from 'formik';

const Styledtextinput = props => {
  const inputRef = React.useRef();

  return (
    <View style={{ marginTop: -10 }}>
      <Text
        style={{
          fontSize: 13,
          fontWeight: '400',
          fontFamily: 'Roboto',
          color: '#888888',
          marginTop: 25,
        }}>
        {props?.title}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          // height: 40,
          marginHorizontal: 5,
          borderBottomWidth: 1,
          borderColor: colors.lightblack,
          alignItems: 'center',
          marginBottom: -5,
          marginTop: -5,
          // paddingBottom:10,
        }}>
        {props?.customicon && props.flirt && (
          <Entypo name="emoji-flirt" size={20} color={colors.primary} />
        )}
        {props?.customicon && props.call && (
          <Ionicons name="call" size={20} color={colors.primary} />
        )}
        {props?.customicon && props.email && (
          <MaterialCommunityIcons
            name="email-outline"
            size={20}
            color={colors.primary}
          />
        )}
        {!props?.customicon && (
          <FontAwesome name="user-circle" size={22} color={colors.primary} />
        )}
        <TextInput
          style={{
            // marginLeft: 5,
            fontWeight: '600',
            fontSize: 18,
            // marginBottom: -10,
            color: colors.lightblack,
            flex: 1,
            marginLeft: 10,
            // marginTop: 5,
          }}
          ref={inputRef}
          // value={text}
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

export default function Userprofile({ navigation }) {
  const [NMSid, setNMSid] = useState('');
  const [Name, onChangeName] = useState('');
  const [Lastname, onChangeLastname] = useState('');
  const [Phone, onChangePhone] = useState('8929495906');
  const [Position, onChangePosition] = useState('Frontend');
  const [School, setSchool] = useState('Mobile Team');
  const [Department, setDepartment] = useState('Avalonmeta');
  const [buttons, setbuttons] = useState(false);

  const [dataRestored, setDataRestored] = useState(false);
  const [Gender, setGender] = useState('');
  const [Newdata, setNewdata] = useState(null);

  const Counts = useSelector(store => store.count.count);
  const dispatch = useDispatch();

  console.log('count', Counts);
  const handleAdmin = () => {
    dispatch(changeCount(!Counts));
  };
  const [newdata, Setnewdata] = useState({
    // });
    Name: 'Ashish',
    Lastname: 'Gupta',
    Gender: '',
    NMSid: '209301184',
    email: 'ashish@avalonmeta.com',
    Position: 'Frontend',
    School: 'SCSE',
    Department: 'CSE',
    Mobile: '8929495906',
  });
  // const [UserInfo, SetUserInfo] = useState();

  var UserInfo = {
    Name: '',
    Lastname: '',
    // Gender: '',
    NMSid: 'Lorem-NMS-ID',
    email: '',
    Position: 'Frontend',
    School: 'SCSE',
    Department: 'CSE',
    Mobile: '8929495906',
  };

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
    Mobile: Yup.string()
      .required('required')
      .min(10, 'to short')
      .max(10, 'to long'),
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
                  color={colors.secondary}
                // style={{ marginTop: -10, marginLeft: -10, zIndez: 400 }}
                />
              </TouchableOpacity>
            </Hstack>
          </View>
          <Hstack
            centered
            styles={{ marginVertical: 10 }}>
            <View style={{ flex: 1 }} />
            <ToggleSwitch
              isOn={Counts}
              onColor="#3182CE"
              offColor={α(colors.primary, 0.2)}
              label="Admin mode"
              labelStyle={{ color: 'black', fontWeight: '900' }}
              size="small"
              onToggle={abc => {
                // setbuttons(!buttons);
                handleAdmin();
              }}
            />
          </Hstack>
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
            {({ values, errors, touched, handleChange, handleBlur }) => {
              {
              }
              const {
                Name,
                Lastname,

                NMSid,
                email,
                Mobile,
              } = values;
              return (
                <>
                  {/* {console.log('newdata', newdata)} */}
                  <Styledtextinput
                    value={Name}
                    placeholder="Enter Your First Name"
                    placeholderTextColor={colors.lightblack}
                    autoCapitalize="none"
                    autoComplete="name"
                    MaterialCommunityIcons
                    error={touched.Name && errors.Name}
                    onChangeText={handleChange('Name')}
                    onBlur={handleBlur('Name')}
                    // returnKeyType="next"
                    blurOnSubmit={false}
                    title="First name"
                  />
                  <Styledtextinput
                    title="Last name"
                    value={Lastname}
                    placeholder="Enter Your Last Name"
                    placeholderTextColor={colors.lightblack}
                    autoCapitalize="none"
                    autoComplete="name"
                    MaterialCommunityIcons
                    error={touched.Lastname && errors.Lastname}
                    onChangeText={handleChange('Lastname')}
                    onBlur={handleBlur('Lastname')}
                    blurOnSubmit={false}
                  />
                  <Styledtextinput
                    title="NMS-id/Registraion number"
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
                    customicon
                    flirt
                  />
                  <Styledtextinput
                    title="Potision"
                    value={Position}
                    placeholder="+91 00000 00000"
                    placeholderTextColor={colors.lightblack}
                    autoCapitalize="none"
                    editable={false}
                    onChangeText={onChangePosition}
                  />
                  <Styledtextinput
                    title="School"
                    value={School}
                    placeholder="+91 00000 00000"
                    placeholderTextColor={colors.lightblack}
                    autoCapitalize="none"
                    editable={false}
                    onChangeText={setSchool}
                  />
                  <Styledtextinput
                    title="Department"
                    value={Department}
                    placeholder="+91 00000 00000"
                    placeholderTextColor={colors.lightblack}
                    autoCapitalize="none"
                    editable={false}
                    onChangeText={setDepartment}
                  />
                  <Styledtextinput
                    title="Mobile number"
                    value={Mobile}
                    placeholder="Enter Your Email address"
                    placeholderTextColor={colors.lightblack}
                    autoCapitalize="none"
                    edit
                    // onChangeText={onChangeEmail}
                    customicon
                    call
                    keyboardType="number-pad"
                    MaterialCommunityIcons
                    error={touched.email && errors.email}
                    onChangeText={handleChange('Mobile')}
                    onBlur={handleBlur('Mobile')}
                  />
                  <Styledtextinput
                    title="Email"
                    value={email}
                    placeholder="Enter Your Email address"
                    placeholderTextColor={colors.lightblack}
                    autoCapitalize="none"
                    edit
                    customicon
                    email
                    // onChangeText={onChangeEmail}
                    keyboardType="email-address"
                    MaterialCommunityIcons
                    error={touched.email && errors.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                  />
                  <TouchableOpacity
                    onPress={() => (
                      Alert.alert('Profile details were saved'),
                      navigation.goBack()
                    )}
                    style={{
                      // padding: 10,
                      backgroundColor: '#ca4b0b',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                      marginTop: 25,
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
