// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// export default function Formdetails() {
//   return (
//     <View>
//       <Text>Formdetails</Text>
//     </View>
//   )
// }

// const styles = StyleSheet.create({})
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
import Hstack from '../component/Hstack';
import KeyboardavoidingWrapper from '../component/KeyboardavoidingWrapper';
import fetchService from '../services/fetchService';
import { Formik } from 'formik';
import * as Yup from 'yup';

const Styledtextinput = (props) => {
  const [text, onChangeText] = React.useState("");
  // https://godconnect.online/api/UserMgmtAPI/ProfileCheck
  const [hidePass, setHidePass] = React.useState(true);
  const navigation = useNavigation();

  return (
    <View>
      <Text
        style={{
          fontSize: 15,
          fontWeight: '500',
          // fontFamily: 'Roboto',
          color: '#edf2f4',
          marginTop: 10,
        }}>
        {props.title}
      </Text>
      <View style={{
        flexDirection: 'row',
        width: '100%',
        // height: 40,
        marginHorizontal: 5,
        borderBottomWidth: 1,
        borderColor: colors.inputs,
        alignItems: 'center',
        marginTop: -10,
      }}>
        {!props.MaterialCommunityIcons ? <FontAwesome name={props.icon} size={20} color={colors.inputs} style={{
          marginBottom: -10
        }} /> :
          <MaterialCommunityIcons name={props.icon} size={20} color={colors.inputs} style={{
            marginBottom: -10
          }} />
        }
        <TextInput
          style={{
            marginLeft: 5,
            fontWeight: '400',
            fontSize: 15,
            marginBottom: -10,
            color: '#caf0f8',
            flex: 1,
          }}
          value={text}
          secureTextEntry={hidePass ? true : false}

          placeholder={props.lable}
          placeholderTextColor={colors.inputs}
          autoCapitalize="none"
          {...props}
        />
        {props.password &&
          <FontAwesome5
            name={hidePass ? 'eye-slash' : 'eye'}
            size={17}
            color="#caf0f8"
            onPress={() => setHidePass(!hidePass)}
          />}
      </View>
      <Hstack between>
        {props.error ? (
          <Text
            style={{
              color: '#edede9',
              fontSize: 13.5,
              marginBottom: -5,
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
            }}></Text>
        )}

      </Hstack>
    </View>
  )
}


export default function Formdetails() {
  // const [EmailId, setEmailId] = useState('');
  const [Error, setError] = useState('')
  const navigation = useNavigation();
  const [Loading, setLoading] = React.useState("");
  const [hidePass, setHidePass] = React.useState(true);
  const FCMToken = 'Its an user token';
  const UserInfo = {
    Name: '',
    phonenumber: '',
    EmailId: '',
    OID: '',
    Commode: '',
  };

  const regex = /^(?:\d{10}|\w+@\w+\.\w{2,3})$/
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const validationSchema = Yup.object({
    Name: Yup
      .string()
      .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
      .max(40)
      .required(),
    phonenumber: Yup.string()
      .required("required")
      .matches(phoneRegExp, 'Phone number is not valid')
      .min(10, "to short")
      .max(10, "to long"),
    OID: Yup.string()
      .required("required")
      .min(8, "Length must be 8 digits")
      .max(8, "Length must be 8 digits"),
    Commode: Yup.string()
      .required("required")
      .min(5, "to short")
      .max(20, "to long"),
    EmailId: Yup.string()
      .trim()
      .email('Invalid email format')
      .min(6, 'Minimum 6 characters is required')
      .required('Required'),
    PWord: Yup.string()
      .trim()
      .required("Please enter your password")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      ),
    cnfPWord: Yup.string()
      .required("Please enter your confirm password")
      .equals(
        [Yup.ref('PWord'), null],
        'Password does not match!',
      ),
  });
  const handlesSignup = async (values) => {
    console.log('values3', values)
    setLoading(true);
    const response = await fetchService.register(values.EmailId, values.PWord);
    setLoading(false);
    if (response.status) {
      navigation.replace('Orderplaced', {
        EmailId: values.EmailId,
      });
    } else {
      setError(response.message);
      Alert.alert(response.msg)
    }
  };

  return (
    <KeyboardavoidingWrapper style={{
      flex: 1,
      backgroundColor: colors.secondary,
    }}>
      <View style={{
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.secondary,

        paddingBottom: 10,
        padding: 15,
        flex: 1,
        paddingRight: 20,
      }}>
        <View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Home', {
                status: 'back',
              })}
            style={{
              backgroundColor: colors.white,
              height: 36,
              width: 36,
              borderRadius: 60,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Octicons name='arrow-left'
              size={27} color={colors.primary} />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 30,
              fontWeight: '700',
              // fontFamily: 'Roboto',
              color: colors.white,
              marginTop: 5,
            }}
          >
            Details screen
          </Text>
          <Text
            style={{
              fontSize: 25,
              fontWeight: '600',
              // fontFamily: 'Roboto',
              color: colors.white,
              marginTop: -5,
              marginBottom: 15
            }}
          >
            basic information of order
          </Text>
        </View>
        <View style={{ marginTop: 100, }}>
          <Formik
            initialValues={UserInfo}
            onSubmit={(values, formikActions) => {
              handlesSignup(values);
              setTimeout(() => {
                // console.log(values);
                formikActions.resetForm();
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
                phonenumber,
                EmailId,
                PWord,
                cnfPWord,
                OID,
                Commode
              } = values;
              return (
                <>

                  {/* export type KeyboardType = 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'number-pad' | 'decimal-pad'; */}
                  <Styledtextinput
                    // onChangeText={setEmailId}
                    value={OID}
                    placeholder='Operator ID'
                    placeholderTextColor={colors.inputs}
                    autoCapitalize="none"
                    title='Enter your Operator ID'
                    icon='email'
                    maxLength={8}
                    keyboardType='numeric'
                    MaterialCommunityIcons
                    error={touched.OID && errors.OID}
                    onChangeText={handleChange('OID')}
                    onBlur={handleBlur('OID')}
                    password={false}
                    secureTextEntry={false}
                  />
                  <Styledtextinput
                    // onChangeText={setEmailId}
                    value={Name}
                    placeholder='Name'
                    placeholderTextColor={colors.inputs}
                    autoCapitalize="none"
                    title='Enter your Name'
                    icon='user'
                    // MaterialCommunityIcons
                    keyboardType='email-address'
                    error={touched.Name && errors.Name}
                    onChangeText={handleChange('Name')}
                    onBlur={handleBlur('Name')}
                  />
                  <Styledtextinput
                    // onChangeText={setEmailId}
                    value={phonenumber}
                    placeholder='Phone'
                    placeholderTextColor={colors.inputs}
                    autoCapitalize="none"
                    title='Enter your Phone Number'
                    icon='phone'
                    keyboardType='phone-pad'
                    MaterialCommunityIcons
                    maxLength={10}
                    error={touched.phonenumber && errors.phonenumber}
                    onChangeText={handleChange('phonenumber')}
                    onBlur={handleBlur('phonenumber')}
                  />
                  <Styledtextinput
                    // onChangeText={setEmailId}
                    value={EmailId}
                    placeholder='Email'
                    placeholderTextColor={colors.inputs}
                    autoCapitalize="none"
                    title='Enter your Email'
                    icon='email'
                    keyboardType='email-address'
                    MaterialCommunityIcons
                    error={touched.EmailId && errors.EmailId}
                    onChangeText={handleChange('EmailId')}
                    onBlur={handleBlur('EmailId')}
                  />

                  <Styledtextinput
                    // onChangeText={setEmailId}
                    value={Commode}
                    placeholder='Communication Mode'
                    placeholderTextColor={colors.inputs}
                    autoCapitalize="none"
                    title='Enter choice of business communication'
                    icon='email'
                    keyboardType='email-address'
                    MaterialCommunityIcons
                    error={touched.Commode && errors.Commode}
                    onChangeText={handleChange('Commode')}
                    onBlur={handleBlur('Commode')}
                  />
                  {/* <Hstack centered between styles={[{}]}> */}

                  <View style={{
                    backgroundColor: colors.primary,
                    marginTop: 20,
                    borderRadius: 15,
                  }}>
                    <TouchableOpacity
                      // onPress={() => {
                      //   Loading ? null :
                      //     handleLogin()
                      // }}
                      submitting={isSubmitting}
                      onPress={() => navigation.replace('Orderplaced')}
                      style={{
                        backgroundColor: '#FFFFFF',
                        padding: 15,
                        borderRadius: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                        // marginVertical: 20,
                        // marginTop: 20,
                        height: 60,
                      }}>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: '700',
                          // fontFamily: 'Roboto',
                          color: colors.primary
                        }}>
                        Register
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              );
            }}
          </Formik>

        </View>
      </View>
      {/* </View> */}
    </KeyboardavoidingWrapper>
  )
}

const styles = StyleSheet.create({})