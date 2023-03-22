/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
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
  Keyboard,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../constants';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Hstack from '../component/Hstack';
import fetchService from '../services/fetchService';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Hstack from '../component/Hstack';

const Styledtextinput = props => {
  const [text, onChangeText] = React.useState('');
  // https://godconnect.online/api/UserMgmtAPI/ProfileCheck
  const [hidePass, setHidePass] = React.useState(true);

  return (
    <View>
      <Text style={styles.customstyle}>{props.title}</Text>
      <View style={styles.inputstyle}>
        {!props.MaterialCommunityIcons ? (
          <FontAwesome
            name={props.icon}
            size={20}
            color={colors.inputs}
            style={{
              marginBottom: -10,
            }}
          />
        ) : (
          <MaterialCommunityIcons
            name={props.icon}
            size={20}
            color={colors.inputs}
            style={{
              marginBottom: -10,
            }}
          />
        )}
        <TextInput
          style={{
            marginLeft: 5,
            fontWeight: '400',
            fontSize: 15,
            color: '#caf0f8',
            marginBottom: -10,
            flex: 1,
          }}
          value={text}
          secureTextEntry={hidePass ? true : false}
          placeholder={props.lable}
          placeholderTextColor={colors.inputs}
          autoCapitalize="none"
          {...props}
        />
        {props.password && (
          <FontAwesome5
            name={hidePass ? 'eye-slash' : 'eye'}
            size={17}
            color="#caf0f8"
            onPress={() => setHidePass(!hidePass)}
          />
        )}
      </View>
      <Hstack between>
        {props.error ? (
          <Text style={styles.errortext}>{props.error}</Text>
        ) : (
          <Text style={styles.errortext} />
        )}
        {props.password && (
          <TouchableOpacity
            onPress={() =>
              Alert.alert('Contact Support team to reset password')
            }>
            <Text style={styles.forgettext}>Forget Password</Text>
          </TouchableOpacity>
        )}
      </Hstack>
    </View>
  );
};

export default function Loginscreen() {
  const [Error, setError] = useState('');
  const navigation = useNavigation();
  const [Loading, setLoading] = React.useState('');
  const [hidePass, setHidePass] = React.useState(true);
  const FCMToken = 'Its an user token';
  const UserInfo = {
    EmailId: '',
    PWord: '',
  };

  const validationSchema = Yup.object({
    EmailId: Yup.string()
      .trim()
      // .matches(regex, 'MI ID must be of 8 Digits')
      .min(8, 'MI ID must be of 8 Digits')
      .required('Required!')
      .min(6, 'Minimum 6 characters is required'),

    PWord: Yup.string()
      .trim()
      .min(8, 'Password is too short!')
      .required('Password is required!'),
  });

  const handlesLogin = async values => {
    setLoading(true);
    const response = await fetchService.login(
      values.EmailId,
      values.PWord,
      FCMToken,
    );
    setLoading(false);
    if (response.status) {
      navigation.replace('Appnavigator', {
        EmailId: values.EmailId,
      });
    } else {
      setError(response.message);
      Alert.alert(response.msg);
    }
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            backgroundColor: colors.secondary,
            padding: 15,
            flex: 1,
            paddingRight: 20,
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              paddingBottom: 10,
            }}>
            <View>
              <Text style={styles.hitext}>Hi</Text>
              <Text style={styles.logintext}>Log In Here</Text>
            </View>
            <View
              style={{
                paddingBottom: 40,
              }}>
              <Formik
                initialValues={UserInfo}
                onSubmit={(values, formikActions) => {
                  handlesLogin(values);
                  setTimeout(() => {
                    formikActions.resetForm();
                    formikActions.setSubmitting(false);
                  }, 4000);
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
                  const {EmailId, PWord} = values;
                  return (
                    <>
                      <Styledtextinput
                        // onChangeText={setEmailId}
                        placeholderTextColor={colors.inputs}
                        title="Enter NMS ID"
                        placeholder="NMS ID"
                        value={EmailId}
                        autoCapitalize="none"
                        icon="email"
                        // keyboardType='email-address'
                        maxLength={8}
                        // keyboardType="numeric"
                        MaterialCommunityIcons
                        error={touched.EmailId && errors.EmailId}
                        onChangeText={handleChange('EmailId')}
                        onBlur={handleBlur('EmailId')}
                        selectionColor={colors.white}
                        password={false}
                        secureTextEntry={false}
                      />
                      <Styledtextinput
                        // onChangeText={setPWord}
                        value={PWord}
                        placeholder="Password"
                        placeholderTextColor={colors.inputs}
                        autoCapitalize="none"
                        title="Enter your Password"
                        icon="lock"
                        // keyboardType='password'
                        error={touched.PWord && errors.PWord}
                        onChangeText={handleChange('PWord')}
                        onBlur={handleBlur('PWord')}
                        password
                        selectionColor={colors.white}
                      />

                      <TouchableOpacity
                        submitting={isSubmitting}
                        onPress={handleSubmit}
                        style={{
                          backgroundColor: '#FFFFFF',
                          padding: 15,
                          borderRadius: 15,
                          justifyContent: 'center',
                          alignItems: 'center',
                          // marginVertical: 20,
                          marginTop: 20,
                          height: 60,
                        }}>
                        {Loading ? (
                          <ActivityIndicator />
                        ) : (
                          <Text
                            style={{
                              fontSize: 20,
                              fontWeight: '700',
                              // fontFamily: 'Roboto',
                              color: colors.secondary,
                            }}>
                            Log In
                          </Text>
                        )}
                      </TouchableOpacity>
                    </>
                  );
                }}
              </Formik>
              {/* <Hstack centered styles={{ marginVertical: 15, }}>
                <View
                  style={styles.hline} />
                <Text
                  style={styles.ortext}>
                  or
                </Text>
                <View
                  style={styles.hline} />
              </Hstack>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Home')
                }}
                style={styles.registerbutton}>
                <Text
                  style={styles.registertext}>
                  Register
                </Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    // </KeyboardavoidingWrapper>
  );
}

const styles = StyleSheet.create({
  backbutton: {
    backgroundColor: colors.white,
    height: 36,
    width: 36,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hitext: {
    fontSize: 40,
    fontWeight: '700',
    // fontFamily: 'Roboto',
    color: colors.white,
    marginTop: 5,
  },
  logintext: {
    fontSize: 25,
    fontWeight: '600',
    // fontFamily: 'Roboto',
    color: colors.white,
    marginTop: -5,
    marginBottom: 15,
  },
  hline: {
    height: 2,
    flex: 1,
    backgroundColor: colors.white3,
    borderRadius: 40,
  },
  registerbutton: {
    backgroundColor: colors.secondary,
    padding: 15,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    // marginVertical: 20,
    height: 60,
    borderWidth: 1.5,
    borderColor: colors.white,
  },
  registertext: {
    fontSize: 20,
    fontWeight: '700',
    // fontFamily: 'Roboto',
    color: colors.white,
  },
  ortext: {
    fontSize: 17,
    fontWeight: '700',
    // fontFamily: 'Roboto',
    color: colors.white3,
    marginHorizontal: 10,
    marginTop: -5,
  },
  forgettext: {
    fontSize: 11,
    fontWeight: '700',
    // fontFamily: 'Roboto',
    color: colors.white,
    marginTop: 5,
  },
  inputstyle: {
    flexDirection: 'row',
    width: '100%',
    // height: 40,
    marginHorizontal: 5,
    borderBottomWidth: 1,
    borderColor: colors.inputs,
    alignItems: 'center',
    marginTop: -10,
  },
  customstyle: {
    fontSize: 15,
    fontWeight: '500',
    // fontFamily: 'Roboto',
    color: '#edf2f4',
    marginTop: 10,
  },
  errortext: {
    color: 'red',
    fontSize: 13.5,
    marginBottom: -10,
    marginLeft: 11,
  },
});
