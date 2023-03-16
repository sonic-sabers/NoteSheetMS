/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  Dimensions,
  Pressable,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Hstack from '../component/Hstack';
import ToggleSwitch from 'toggle-switch-react-native';

import { useNavigation } from '@react-navigation/native';

export const CustomHeader = ({
  searchFilterFunction,
  search,
  setSearch,
  searchRef,
  setVisible,
}) => {
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        height: 70,
        marginTop: 20,
        justifyContent: 'space-between',
      }}>
      <View
        style={{
          width: '80%',
          height: 50,
          borderRadius: 10,
          borderWidth: 0.2,
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 15,
        }}>
        <AntDesign
          name="search1"
          size={25}
          style={{ color: '#ef233c99', marginLeft: 8 }}
        />
        <TextInput
          ref={searchRef}
          placeholder="search item here..."
          style={{ width: '76%', height: 50 }}
          value={search}
          onChangeText={txt => {
            // searchFilterFunction(txt);
            // setSearch(txt);
            // console.log('CustomHeader',txt);
          }}
        />
        {/* {search == '' ? null : (
          <TouchableOpacity
            style={{ marginRight: 15 }}
            onPress={() => {
              // searchRef.current.clear();
              // searchFilterFunction('');
              // setSearch('');
            }}>
            <AntDesign
              name="closecircleo"
              size={25}
              style={{ color: '#ef233c99', marginLeft: 8 }}
            />
          </TouchableOpacity>
        )} */}
      </View>
    </View>
  );
};

const Options = () => {
  const [visible, setVisible] = useState(false);
  const [buttons, setbuttons] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const searchRef = useRef();
  const [oldData, setOldData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(response => {
        // console.log(response);
        setData(response);
        setOldData(response);
      });
  }, []);
  const searchFilterFunction = text => {
    // Check if searched text is not blank
    if (text !== '') {
      let tempData = data.filter(item => {
        return item.title.toLowerCase().indexOf(text.toLowerCase()) > -1;
      });
      setData(tempData);
    } else {
      setData(oldData);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      {/* <CustomHeader search={search} searchFilterFunction={searchFilterFunction} setSearch={setSearch} searchRef={searchRef} setVisible={setVisible}/> */}
      <Hstack centered styles={{ marginTop: 10, marginRight: 20 }}>
        <View style={{ flex: 1 }} />
        <ToggleSwitch
          isOn={buttons}
          onColor="green"
          offColor="red"
          label="Show buttons"
          labelStyle={{ color: 'black', fontWeight: '900' }}
          size="medium"
          onToggle={setbuttons}
        />
        <TouchableOpacity
          style={{
            // marginRight: 15,
            height: 40,
            width: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
            backgroundColor: '#9bf3ee50',
            marginLeft: 10,
          }}
          onPress={() => {
            setVisible(true);
          }}>
          <MaterialCommunityIcons
            name="filter-outline"
            size={25}
            style={{ color: '#7209b7', marginRight: 0 }}
          />
        </TouchableOpacity>
      </Hstack>


      <FlatList
        data={data}
        // stickyHeaderHiddenOnScroll
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                width: Dimensions.get('window').width - 15,
                marginHorizontal: 10,
                borderRadius: 10,
                borderWidth: 0.5,
                alignSelf: 'center',
                marginTop: 10,
                marginBottom: index === data.length - 1 ? 20 : 10,
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Image
                source={{ uri: item.image }}
                style={{
                  width: buttons ? 70 : 60,
                  height: '90%',
                  marginLeft: 10,
                  borderRadius: 10,
                }}
              />
              <View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{ fontWeight: '600', marginLeft: 10, marginTop: 10 }}>
                    {item.title.substring(0, 30)}
                  </Text>
                  <Text style={{ fontSize: 12, margin: 10 }}>
                    {item.description.substring(0, 50)}
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        marginLeft: 10,
                        fontWeight: '800',
                        color: 'green',
                      }}>
                      {'$ ' + item.price}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        marginLeft: 50,
                        fontWeight: '800',
                        color: 'orange',
                      }}>
                      {item.rating.rate}
                    </Text>
                    <AntDesign
                      name="star"
                      size={25}
                      style={{ color: '#ef233c99', marginLeft: 8 }}
                    />
                  </View>
                </View>
                {buttons && (
                  <Hstack
                    centered
                    between
                    styles={{
                      marginLeft: 10,
                      marginBottom: 10,
                      flex: 1,
                      // backgroundColor:'red',
                      width: Dimensions.get('window').width - 120,
                    }}>
                    <TouchableOpacity
                      style={{
                        height: 35,
                        width: 35,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 5,
                        backgroundColor: '#89cb12a0',
                      }}>
                      <MaterialCommunityIcons
                        name="check-all"
                        size={25}
                        style={{ color: '#7209b7', marginRight: 0 }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        height: 35,
                        width: 35,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 5,
                        backgroundColor: '#89cb12a0',
                      }}>
                      <MaterialCommunityIcons
                        name="skull-crossbones-outline"
                        size={25}
                        style={{ color: '#7209b7', marginRight: 0 }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        height: 35,
                        width: 35,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 5,
                        backgroundColor: '#89cb12a0',
                      }}>
                      <MaterialCommunityIcons
                        name="account-clock-outline"
                        size={25}
                        style={{ color: '#7209b7', marginRight: 0 }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        height: 35,
                        width: 35,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 5,
                        backgroundColor: '#89cb12a0',
                      }}>
                      <MaterialCommunityIcons
                        name="fast-forward"
                        size={25}
                        style={{ color: '#7209b7', marginRight: 0 }}
                      />
                    </TouchableOpacity>
                  </Hstack>
                )}
              </View>
            </View>
          );
        }}
      />
      <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('CreateNotesheet')}
          style={{
            height: 40,
            width: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 40,
            backgroundColor: '#89cb12a0',
            zIndex: 1,
            alignSelf: 'flex-end',
          }}>
          <MaterialCommunityIcons
            name="plus"
            size={30}
            style={{ color: '#7209b7', marginRight: 0 }}
          />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setVisible(!visible);
        }}>
        <Pressable style={{ flex: 1 }}
          onPress={() => {
            setVisible(!visible);
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,.5)',
            }}>
            <View
              style={{
                width: '80%',
                height: 200,
                borderRadius: 10,
                backgroundColor: '#fff',
              }}>
              <TouchableOpacity
                style={{
                  width: '100%',
                  height: 50,
                  borderBottomWidth: 0.5,
                  justifyContent: 'center',
                  paddingLeft: 20,
                }}
                onPress={() => {
                  setSelectedFilter(1);
                  const strAscending = data.sort((a, b) =>
                    a.title > b.title ? 1 : -1,
                  );
                  setData(strAscending);
                  setVisible(false);
                }}>
                <Text style={{ fontSize: 18, color: '#000' }}> Sort By Name</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: '100%',
                  height: 50,
                  borderBottomWidth: 0.5,
                  justifyContent: 'center',
                  paddingLeft: 20,
                }}
                onPress={() => {
                  setSelectedFilter(2);
                  setData(data.sort((a, b) => a.price - b.price));
                  setVisible(false);
                }}>
                <Text style={{ fontSize: 18, color: '#000' }}>
                  Low to High Price
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: '100%',
                  height: 50,
                  borderBottomWidth: 0.5,
                  justifyContent: 'center',
                  paddingLeft: 20,
                }}
                onPress={() => {
                  setSelectedFilter(3);
                  setData(data.sort((a, b) => b.price - a.price));
                  setVisible(false);
                }}>
                <Text style={{ fontSize: 18, color: '#000' }}>
                  Hight to Low Price
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: '100%',
                  height: 50,
                  borderBottomWidth: 0.5,
                  justifyContent: 'center',
                  paddingLeft: 20,
                }}
                onPress={() => {
                  setSelectedFilter(4);
                  setData(data.sort((a, b) => b.rating.rate - a.rating.rate));
                  setVisible(false);
                }}>
                <Text style={{ fontSize: 18, color: '#000' }}> Sort By Rating</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default Options;
