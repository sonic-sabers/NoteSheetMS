/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// import {colors} from '../../constants';
import {Dropdown} from 'react-native-element-dropdown';
import CheckBox from 'react-native-check-box';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {colors} from '../constants';
import α from 'color-alpha';
import DropDownPicker from 'react-native-dropdown-picker';

const SchoolData = [
  {label: 'CSE', value: '1'},
  {label: 'IT', value: '2'},
  {label: 'CCE', value: '3'},
];
const DepartmentData = [
  {label: 'CSE', value: '1'},
  {label: 'IT', value: '2'},
  {label: 'CCE', value: '3'},
  {label: 'DSE', value: '4'},
  {label: 'CSE AI/ML', value: '5'},
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
        <Text style={[styles.label, isFocus && {color: '#00000080'}]}>
          {lableText ? lableText : 'Lable'}
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={{marginBottom: 15, marginTop: 5}}>
      {/* <RenderLabel /> */}
      <Text
        style={{
          fontSize: 15,
          fontWeight: '700',
          color: '#000',
          marginTop: 5,
          marginBottom: 5,
        }}>
        {lableText ? lableText : 'Subject'}
      </Text>
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: '#00000080'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        itemTextStyle={{color: '#00000080'}}
        iconStyle={styles.iconStyle}
        activeColor={colors.primary}
        data={dropdownData}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholderTextColor="#00000050"
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

const CustomTextInput = ({
  title,
  onChangeText,
  text,
  placeholdervalue,
  HeightView,
}) => {
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
      <View
        style={[
          {
            borderWidth: 1,
            borderRadius: 7,
            borderColor: '#33333360',
            // padding: 5,
            marginTop: 5,
            flex: 1,
          },
          HeightView
            ? {
                minHeight: 120,
                maxHeight: 180,
              }
            : {minHeight: 45, maxHeight: 70},
        ]}>
        <TextInput
          style={[
            {
              // flex: 1,
              fontSize: 15,
              paddingLeft: 10,
              color: '#666666',
              // backgroundColor: 'red',
              // marginTop: -5,
              // paddingTop: 15,
            },
          ]}
          multiline={true}
          placeholderTextColor="#00000050"
          placeholder={placeholdervalue}
          onChangeText={onChangeText}
          value={text}
        />
      </View>
    </View>
  );
};

const CustomCheckboxHolder = ({setValues, Values, title, Nobox}) => {
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
      {!Nobox && (
        <CheckBox
          checkedCheckBoxColor={α(colors.primary, 0.4)}
          style={{alignItems: 'center', marginTop: 10}}
          onClick={() => {
            setValues(!Values);
          }}
          isChecked={Values}
        />
      )}
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
  const [selectedItems, setselectedItems] = useState(false);
  const [Authorities, setAuthorities] = useState(false);
  const [Director, setDirector] = useState(false);
  const [HOD, setHOD] = useState(false);
  const [Others, setOthers] = useState(false);
  const [valueSchool, setValueSchool] = useState(null);
  const [isFocusSchool, setIsFocusSchool] = useState(false);
  const [valueDept, setValueDept] = useState(null);
  const [isFocusDept, setIsFocusDept] = useState(false);
  const [DateValue, onChangeDateValue] = React.useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([
    {label: 'Dr. Ajay Kumar', value: 'Dr. Ajay Kumar'},
    {label: 'Dr. Amit Kumar Bairwa', value: 'Dr. Amit Kumar Bairwa'},
    {label: 'Dr. Chhattar Singh Lamba', value: 'Dr. Chhattar Singh Lamba'},
    {label: 'Dr. Neelam Chaplot', value: 'Dr. Neelam Chaplot'},
    {label: 'Mr. Shishir Singh Chauhan', value: 'Mr. Shishir Singh Chauhan'},
    {label: 'Dr. Rishi Gupta', value: 'Dr. Rishi Gupta'},
    {label: 'Ms. Deepti Sharma', value: 'Ms. Deepti Sharma'},
    {label: 'Dr. Sushama Tanwar', value: 'Dr. Sushama Tanwar'},
    {label: 'Ms. Juhi Singh', value: 'Ms. Juhi Singh'},
    {label: 'Dr. Yadvendra Pratap Singh', value: 'Dr. Yadvendra Pratap Singh'},
    {label: 'Dr. Deepika Shekhawat', value: 'Dr. Deepika Shekhawat'},
  ]);

  const FormatDate = data => {
    let dateTimeString =
      data.getDate() + '-' + (data.getMonth() + 1) + '-' + data.getFullYear();
    return dateTimeString; // It will look something like this 3-5-2021 16:23
  };
  const handleConfirm = date => {
    onChangeDateValue(FormatDate(date));
    hideDatePicker();
  };
  const dateTimePicker = (
    <DateTimePickerModal
      isVisible={isDatePickerVisible}
      mode="date"
      onConfirm={handleConfirm}
      onCancel={hideDatePicker}
      date={DateValue ? new Date(DateValue) : undefined}
      minimumDate={new Date()}
      // maximumDate={addDays(new Date(), 5)}
    />
  );

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {dateTimePicker}
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{}}
        style={{
          padding: 16,
        }}>
        <View style={{marginBottom: 5}}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '700',
              color: '#000',
              marginTop: 5,
            }}>
            Select Date
          </Text>
          <TouchableOpacity
            onPress={() => showDatePicker()}
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
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontWeight: '400',
                fontFamily: 'Roboto',
                fontSize: 15,
                // paddingLeft: 15,
                color: '#66666699',
              }}>
              {DateValue === '' ? 'Date' : DateValue}
            </Text>
          </TouchableOpacity>
        </View>
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
          title="Details"
          onChangeText={setDetails}
          text={Details}
          placeholdervalue="Enter Details of Notesheet"
          HeightView
        />
        <CustomTextInput
          title="Objective"
          onChangeText={setObjective}
          text={Objective}
          placeholdervalue="Enter Objective of Notesheet"
          HeightView
        />
        <CustomTextInput
          title="Proposed By 1"
          onChangeText={setProppsedBy1}
          text={ProppsedBy1}
          placeholdervalue="Enter Convener 1 of Notesheet"
        />
        <CustomTextInput
          title="Proposed By 2"
          onChangeText={setPropsedBy2}
          text={PropsedBy2}
          placeholdervalue="Enter Convener 2 of Notesheet"
        />
        <CustomCheckboxHolder
          setValues={setAuthorities}
          Values={Authorities}
          Nobox
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
        {Others ? (
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            // theme="DARK"
            multiple={true}
            mode="BADGE"
            listMode="MODAL"
            placeholder="Select concerned faculty"
            badgeDotColors={[colors.primary]}
            textStyle={{
              // fontWeight: '600',
              // fontSize: 16,
              fontSize: 15,
              // paddingLeft: 10,
              color: '#666666',
              // color: theme.button_secondary_text,
            }}
            placeholderStyle={[
              {
                // color: theme.nav_inactive_state,
                fontSize: 15,
                color: '#00000050',
                fontWeight: '400',
              },
            ]}
            dropDownContainerStyle={[
              {
                borderWidth: 1,
                borderRadius: 7,
                borderColor: '#00000050',
                // padding: 5,
                // marginTop: 5,
                // flex: 1,
              },
            ]}
            style={[
              {
                borderWidth: 1,
                borderRadius: 7,
                borderColor: '#33333360',
                // padding: 5,
                marginVertical: 5,
                height: 50,
                // flex: 1,
              },
            ]}
          />
        ) : null}
        <View>
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
              height: 40,
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
            onPress={() => navigation.goBack()}
            style={{
              padding: 10,
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              marginVertical: 15,
              borderWidth: 1,
              borderColor: '#999',
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
