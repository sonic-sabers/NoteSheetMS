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
  UIManager,
  Platform,
  LayoutAnimation,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Hstack from '../component/Hstack';
import ToggleSwitch from 'toggle-switch-react-native';

import { useNavigation } from '@react-navigation/native';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

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
          size={22}
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

const Custombutton = props => {
  const { title, color } = props;
  return (
    <TouchableOpacity
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        backgroundColor: '#11111108',
        paddingVertical: 5,
        paddingHorizontal: 7,
        flex: 1,
        marginHorizontal: 8,
      }}>
      {/* <Hstack centered> */}
      {props.children}
      <Text
        style={{
          fontSize: 12,
          // fontWeight: '500',
          fontFamily: 'Inter-Regular',
          color,
          // marginLeft: 5,
          alignSelf: 'center',
        }}>
        {title}
      </Text>
      {/* </Hstack> */}
    </TouchableOpacity>
  );
};

const Options = ({ showbuttons }) => {
  const [visible, setVisible] = useState(false);
  const [buttons, setbuttons] = useState(false);
  const [status, setstatus] = useState(false);
  const [data, setData] = useState([]);
  const [limit, setlimit] = useState(10);
  const searchRef = useRef();
  const [oldData, setOldData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const navigation = useNavigation();
  console.log('12');

  const fetchdata = async () => {
    const res = await fetch(`https://dummyjson.com/products/?limit=${limit}`);
    setLoading(false);
    const json = await res.json();
    setlimit(limit + 10);
    let response = json.products;
    setData(response);
    setOldData(response);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const onRefresh = () => {
    setLoading(true);
    fetchdata();
  };

  return (
    <View style={{ flex: 1 }}>
      {/* <CustomHeader search={search} searchFilterFunction={searchFilterFunction} setSearch={setSearch} searchRef={searchRef} setVisible={setVisible}/> */}
      {showbuttons ? <Hstack centered styles={{ marginTop: 10, marginRight: 20 }}>
        <View style={{ flex: 1 }} />
        <ToggleSwitch
          isOn={buttons}
          onColor="#3182CE"
          offColor="#3182CE40"
          label="Show buttons"
          labelStyle={{ color: 'black', fontWeight: '900' }}
          size="medium"
          onToggle={abc => {
            setbuttons(!buttons);
          }}
        />

        {/* <TouchableOpacity
          style={{
            // marginRight: 15,
            height: 40,
            width: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
            borderColor: '#3182CE',
            marginLeft: 10,
            borderWidth: 1,
          }}
          onPress={() => {
            setVisible(true);
          }}>
          <MaterialCommunityIcons
            name="filter-outline"
            size={25}
            style={{color: '#3182CE', marginRight: 0}}
          />
        </TouchableOpacity> */}
      </Hstack> : null}

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
                borderRadius: 7,
                // borderWidth: 0.5,
                alignSelf: 'center',
                marginTop: 10,
                marginBottom: index === data.length - 1 ? 10 : 5,
                alignItems: 'center',
                flexDirection: 'row',
                // height: buttons ? 170 : 110,
                backgroundColor: '#fff',
                paddingVertical: 5,
              }}>
              <View>
                <View
                  style={
                    {
                      // flex: 1
                    }
                  }>
                  <Text
                    style={{
                      fontWeight: '600',
                      marginLeft: 10,
                      marginTop: 10,
                      fontSize: 20,
                      color: '#111111',
                      fontFamily: 'Inter-Medium',
                    }}>
                    {item.title.substring(0, 30)}
                  </Text>
                  <Text
                    style={{
                      margin: 10,
                      fontSize: 15,
                      color: '#333333',
                      fontFamily: 'Inter-Regular',
                    }}>
                    {item.description.substring(0, 50)}
                  </Text>
                  <Text
                    style={{
                      marginLeft: 10,
                      fontSize: 15,
                      color: '#333333',
                      fontFamily: 'Inter-Regular',
                      fontStyle: 'italic',
                    }}>
                    Assignor :- {item.description.substring(0, 10)}
                  </Text>
                </View>
                {buttons && (
                  <Hstack
                    centered
                    between
                    styles={{
                      // marginLeft: 10,
                      marginBottom: 10,
                      // flex: 1,
                      // backgroundColor: 'red',
                      marginTop: 10,
                      width: Dimensions.get('window').width - 20,
                      // flex: 1,
                    }}>
                    <Custombutton title="Approve" color="#111">
                      <Feather
                        name="check"
                        size={24}
                        style={{ color: '#2b9348', marginTop: 2 }}
                      />
                    </Custombutton>
                    <Custombutton title="Reject" color="#111">
                      <Entypo
                        name="cross"
                        size={24}
                        style={{ color: '#E53E3E', marginRight: 0 }}
                      />
                    </Custombutton>
                    <Custombutton title="Meet" color="#111">
                      <MaterialCommunityIcons
                        name="account-clock-outline"
                        size={24}
                        style={{ color: '#DD6B20', marginRight: 0 }}
                      />
                    </Custombutton>
                    <Custombutton title="Fwd" color="#111">
                      <MaterialCommunityIcons
                        name="fast-forward"
                        size={24}
                        style={{ color: '#3182CE99', marginRight: 0 }}
                      />
                    </Custombutton>
                  </Hstack>
                )}
              </View>
            </View>
          );
        }}
        onRefresh={onRefresh}
        onEndReached={fetchdata}
        refreshing={Loading}
        removeClippedSubviews={true}
        onEndReachedThreshold={0.5}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        ListEmptyComponent={
          <View
            style={{
              height: 100,
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: 100,
              marginBottom: 30,
            }}>
            <ActivityIndicator animating color="#3182CE99" size={35} />
          </View>
        }
      />
      <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('CreateNotesheet')}
          style={{
            height: 55,
            width: 55,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 40,
            backgroundColor: '#3182CE99',
            zIndex: 1,
            alignSelf: 'flex-end',
          }}>
          <MaterialCommunityIcons
            name="plus"
            size={40}
            style={{ color: '#fff', marginRight: 0 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Options;
