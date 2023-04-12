import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import { colors } from '../constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Entypo from 'react-native-vector-icons/Entypo';

export default function Forwardscreen({ navigation }) {
  const [selected, setSelected] = React.useState('');

  // const data = [
  //   {key: '2', value: 'Appliances'},
  //   {key: '3', value: 'Cameras'},
  //   {key: '5', value: 'Vegetables'},
  //   {key: '6', value: 'Diary Products'},
  //   {key: '7', value: 'Drinks'},
  // ];

  const data = [
    { key: '1', value: 'Dr. Ajay Kumar' },
    { key: '2', value: 'Dr. Amit Kumar Bairwa' },
    { key: '3', value: 'Dr. Chhattar Singh Lamba' },
    { key: '4', value: 'Dr. Neelam Chaplot' },
    { key: '5', value: 'Mr. Shishir Singh Chauhan' },
    { key: '6', value: 'Dr. Rishi Gupta' },
    { key: '7', value: 'Ms. Deepti Sharma' },
    { key: '8', value: 'Dr. Sushama Tanwar' },
    { key: '9', value: 'Ms. Juhi Singh' },
    { key: '10', value: 'Dr. Yadvendra Pratap Singh' },
    { key: '11', value: 'Dr. Deepika Shekhawat' },
  ];

  const setSelectedHandler = val => {
    if (selected.length < 5) {
      setSelected(val);
    } else {
      Alert.alert('Only 5 faculties can be selectes to fwd');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.white, padding: 10 }}>
      <View style={{ flex: 1 }}>
        <MultipleSelectList
          setSelected={val => setSelectedHandler(val)}
          data={data}
          save="value"
          label="Faculties"
          maxHeight={350}
          // search
          inputStyles={{ marginLeft: 10, color: colors.lightblack }}
          dropdownTextStyles={{ color: colors.black }}
          style={{ color: colors.black }}
          placeholder="Add faculties here"
          placeholderTextColor="green"
          notFoundText="No such faculty found"
          // dropdownStyles={{ backgroundColor: 'red' }}
          boxStyles={{ color: colors.lightblack, fontSize: 20 }}
          arrowicon={
            <FontAwesome name="chevron-down" size={12} color={'black'} />
          }
          searchicon={<FontAwesome name="search" size={12} color={'black'} />}
        />
      </View>
      <TouchableOpacity
        onPress={() => (
          Alert.alert('Note sheet has been forwarded to respective faculties'),
          navigation.navigate('Rootnavigator')
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
    </View>
  );
}

const styles = StyleSheet.create({});
