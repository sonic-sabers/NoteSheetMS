import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
  Pressable,
  Modal,
  TextInput,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { colors } from '../constants';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Hstack from '../component/Hstack';
// import Hstack from '../component/Hstack';

const BaseApi =
  'https://attendence-production.up.railway.app/api/class/attendence';
export default function Detailsscreen() {
  const [Data, setData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [text, onChangeText] = React.useState('');
  const [regno, onChangeregno] = React.useState('');

  const getDataUsingGet = () => {
    setLoading(true);
    //GET request
    fetch(BaseApi, {
      method: 'GET',
      //Request Type
    })
      .then(response => response.json())
      //If response is in json then in success
      .then(responseJson => {
        setLoading(false);
        //Success
        let userData = responseJson;
        // alert(JSON.stringify(responseJson));
        setData(userData.data);
        temp = Data;
        console.log(Data);
      })
      //If response is not in json then in error
      .catch(error => {
        setLoading(false);

        //Error
        // alert(JSON.stringify(error));
        console.error(error);
      });
  };
  useEffect(() => {
    getDataUsingGet();
  }, []);

  const addStudent = async name => {
    let temp = [];
    temp = Data;
    console.log('text', text);
    temp.push(name);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: ({ 'data': temp }),
    };
    fetch(BaseApi, requestOptions)
      .then(response => response.json())
      .then(data => getDataUsingGet());

    // getDataUsingGet();
    console.log('data', temp);
    // setData(temp);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primary,
        padding: 10,
      }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Feather
              onPress={() => setModalVisible(!modalVisible)}
              name="arrow-left" //
              size={25}
              color="#023047"
            />
            <Text style={styles.modalText}>
              Enter Student details to be added!
            </Text>

            <View style={{ flex: 1 }}>
              <TextInput
                placeholder="Student Name"
                placeholderTextColor={'#444'}
                style={{
                  height: 40,
                  marginVertical: 12,
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 5,
                  paddingLeft: 14,
                  color: '#444',
                }}
                onChangeText={onChangeText}
                value={text}
              />
              <TextInput
                placeholder="Student Reg. Number"
                placeholderTextColor={'#444'}
                style={{
                  height: 40,
                  marginVertical: 12,
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 5,
                  paddingLeft: 14,
                  color: '#444'

                }}
                onChangeText={onChangeregno}
                value={regno}
              />
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                addStudent(text), setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textStyle}>Add student</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Hstack centered between>
        <View />
        <Hstack>
          <TouchableOpacity
            onPress={() => getDataUsingGet()}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 40,
              width: 40,
              // padding: 10,
              backgroundColor: '#fefae0',
              alignSelf: 'flex-end',
              marginVertical: 20,
              borderRadius: 20,
              marginHorizontal: 8,
            }}>
            <Feather
              name="refresh-cw" //
              size={25}
              color="#023047"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => getDataUsingGet()}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 40,
              width: 40,
              // padding: 10,
              backgroundColor: '#fefae0',
              alignSelf: 'flex-end',
              marginVertical: 20,
              borderRadius: 20,
              marginHorizontal: 8,
            }}>
            <Feather
              name="plus" //
              size={25}
              color="#023047"
            />
          </TouchableOpacity>
        </Hstack>
      </Hstack>
      <Pressable
        style={[
          styles.button,
          Loading ? styles.buttoninactive : styles.buttonOpen,
        ]}
        onPress={() => (Loading ? null : setModalVisible(true))}>
        <Text style={styles.textStyle}>Add student</Text>
      </Pressable>
      {Loading ? (
        <ActivityIndicator size="large" color="#48cae4" />
      ) : (
        <>
          {Data.length ? (
            Data.map(person => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    padding: 10,
                    borderRadius: 8,
                    backgroundColor: '#fff',
                    marginBottom: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: '400',
                      // fontFamily: 'Roboto',
                      color: '#000',
                      flex: 1,
                    }}>
                    {person}
                  </Text>
                  <MaterialCommunityIcons
                    name="google-classroom"
                    size={25}
                    style={{ color: '#7209b7', marginRight: 10 }}
                  />
                </View>
              );
            })
          ) : (
            <>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '400',
                  // fontFamily: 'Roboto',
                  color: '#000',
                }}>
                No student Data to show
              </Text>
            </>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flex: 1,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
    marginBottom: 20,
  },
  buttoninactive: {
    backgroundColor: '#33333390',
    marginBottom: 20,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginVertical: 15,
    textAlign: 'center',
    color: '#333',
    fontWeight: '500',
    fontSize: 20,
  },
  input: {},
});
