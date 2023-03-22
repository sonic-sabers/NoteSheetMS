import React, { Component, useState, useEffect, useRef } from 'react';
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
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import {colors} from '../../constants';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CheckBox from 'react-native-check-box';

const SchoolData = [
  { label: 'CSE', value: '1' },
  { label: 'IT', value: '2' },
  { label: 'CCE', value: '3' },
];
const DepartmentData = [
  { label: 'CSE', value: '1' },
  { label: 'IT', value: '2' },
  { label: 'CCE', value: '3' },
  { label: 'DSE', value: '4' },
  { label: 'CSE AI/ML', value: '5' },
];

const CustomDropdown = props => {
  const {
    isFocus,
    setIsFocus,
    setValue,
    value,
    dropdownData,
    lableText,
    placeholderText,
  } = props;
  const RenderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
          {lableText ? lableText : 'Lable'}
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={{ marginBottom: 15, marginTop: 5 }}>
      <RenderLabel />
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={dropdownData}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? placeholderText : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

const CustomTextInput = ({ title, onChangeText, text, placeholdervalue }) => {
  return (
    <View
      style={{
        marginBottom: 10,
      }}>
      <Text
        style={{
          fontSize: 15,
          fontWeight: '700',
          color: '#000',
          marginTop: 5,
        }}>
        {title ? title : 'Subject'}
      </Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderRadius: 7,
          borderColor: '#33333360',
          padding: 5,
          height: 50,
          fontSize: 15,
          paddingLeft: 15,
          color: '#666666',
          marginTop: 5,
        }}
        placeholder={placeholdervalue}
        // placeholder="Enter Subject of Notesheet"
        onChangeText={onChangeText()}
        value={text}
      />
    </View>
  );
};

const CustomCheckboxHolder = ({ setValues, Values, title }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
      }}
      centered>
      <Text
        style={{
          fontSize: 15,
          fontWeight: '700',
          color: '#000',
          marginTop: 5,
          flex: 1,
        }}>
        {title ? title : 'Subject'}
      </Text>
      <CheckBox
        checkedCheckBoxColor="#3182CE"
        style={{ alignItems: 'center', marginTop: 10 }}
        onClick={() => {
          setValues(!Values);
        }}
        isChecked={Values}
      />
    </View>
  );
};

export default function CreateNotesheet() {
  const [Subject, setSubject] = useState(null);
  const [Description, setDescription] = useState('');
  const [Objective, setObjective] = useState('');
  const [Details, setDetails] = useState('');
  const [ProppsedBy1, setProppsedBy1] = useState('');
  const [PropsedBy2, setPropsedBy2] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [Authorities, setAuthorities] = useState(false);
  const [Director, setDirector] = useState(false);
  const [HOD, setHOD] = useState(false);
  const [Others, setOthers] = useState(false);
  const [valueSchool, setValueSchool] = useState(null);
  const [isFocusSchool, setIsFocusSchool] = useState(false);
  const [valueDept, setValueDept] = useState(null);
  const [isFocusDept, setIsFocusDept] = useState(false);
  const [text, onChangeText] = React.useState('');
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{}}
        style={{
          padding: 16,
        }}>
        <CustomDropdown
          isFocus={isFocusSchool}
          placeholderText="Select School"
          lableText="School"
          setIsFocus={setIsFocusSchool}
          setValue={setValueSchool}
          dropdownData={SchoolData}
          value={valueSchool}
        />
        <CustomDropdown
          isFocus={isFocusDept}
          placeholderText="Select Department"
          lableText="Department"
          setIsFocus={setIsFocusDept}
          setValue={setValueDept}
          dropdownData={DepartmentData}
          value={valueDept}
        />

        <CustomTextInput
          title="Subject"
          onChangeText={setSubject}
          text={Subject}
          placeholdervalue="Enter Subject of Notesheet"
        />
        <CustomTextInput
          title="Description"
          onChangeText={setDescription}
          text={Description}
          placeholdervalue="Enter Description of Notesheet"
        />
        <CustomTextInput
          title="Objective"
          onChangeText={setObjective}
          text={Objective}
          placeholdervalue="Enter Objective of Notesheet"
        />
        <CustomTextInput
          title="Details"
          onChangeText={setDetails}
          text={Details}
          placeholdervalue="Enter Details of Notesheet"
        />
        <CustomTextInput
          title="Proppsed By 1"
          onChangeText={setProppsedBy1}
          text={ProppsedBy1}
          placeholdervalue="Enter Convener 1 of Notesheet"
        />
        <CustomTextInput
          title="Propsed By 2"
          onChangeText={setPropsedBy2}
          text={PropsedBy2}
          placeholdervalue="Enter Convener 2 of Notesheet"
        />
        <CustomCheckboxHolder
          setValues={setAuthorities}
          Values={Authorities}
          title="Select Authorities for Approval"
        />
        <CustomCheckboxHolder
          setValues={setDirector}
          Values={Director}
          title="Select Director for Approval"
        />
        <CustomCheckboxHolder
          setValues={setHOD}
          Values={HOD}
          title="Select HOD for Approval"
        />
        <CustomCheckboxHolder
          setValues={setOthers}
          Values={Others}
          title="Select Others for Approval"
        />
        <View>
          <TouchableOpacity
            onPress={() => (
              Alert.alert('Note Sheet is created'),
              navigation.goBack()
            )}
            style={{
              padding: 10,
              backgroundColor: '#3182CE',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              marginTop: 15,
            }}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: '500',
                color: '#fff',
              }}>
              Create
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.goBack()
            }
            style={{
              padding: 10,
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              marginVertical: 15,
              borderWidth: 1,
              borderColor: '#999'
            }}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: '500',
                color: '#999',
              }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            paddingBottom: 50,
          }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: -8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    marginLeft: 5,
    color: '#666666',
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 5,
    color: '#666666',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
