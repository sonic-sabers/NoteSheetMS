/* eslint-disable react-hooks/exhaustive-deps */
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
  Alert,
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
import α from 'color-alpha';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../constants';
import { Itemsdata } from '../database/Database';

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
        backgroundColor: colors.tempbg,
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
          placeholder="Search Notesheet here..."
          style={{ width: '76%', height: 50 }}
          value={search}
          placeholderTextColor="#00000050"
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

export const Custombutton = props => {
  const { title, color, end, onPress } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 7,
          backgroundColor: '#fafafa',
          paddingVertical: 5,
          paddingHorizontal: 7,
          flex: 1,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,

          elevation: 2,
        },
        !end && { marginHorizontal: 8 },
      ]}>
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

const Rendertask = ({ buttons, item, data, index }) => {
  const navigation = useNavigation();
  // console.log('response', item);
  // {id: 6, title: "MacBook Pro", ̃description: "MacBook Pro 2021 with mini-LED display may launch between September, November", price: 1749, discountPercentage: 11.02, …}
  return (
    <Pressable
      key={item.id}
      onPress={() => navigation.navigate('Detailednote', { item })}
      style={{
        width: Dimensions.get('window').width - 25,
        marginHorizontal: 10,
        borderRadius: 7,
        // borderWidth: 0.5,
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: index === data.length - 1 ? 10 : 5,
        alignItems: 'center',
        flexDirection: 'row',
        // height: buttons ? 170 : 110,
        backgroundColor: '#ffffff',
        paddingVertical: 5,
        paddingBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        flex: 1,
      }}>
      <View>
        <View>
          <Text
            style={{
              fontWeight: '600',
              marginLeft: 10,
              marginTop: 5,
              fontSize: 20,
              color: '#111111',
              fontFamily: 'Inter-Medium',
            }}>
            {item?.Subject?.substring(0, 30)}
          </Text>
          <Hstack centered between>
            <Text
              style={{
                marginLeft: 10,
                fontSize: 15,
                color: '#333333',
                fontFamily: 'Inter-Regular',
                fontStyle: 'normal',
                // flex: 1,
              }}>
              Date : {item.eventDate}
            </Text>
            {item.isAvailable ? (
              <Text
                style={{
                  marginRight: 15,
                  fontSize: 15,
                  color: 'red',
                  fontFamily: 'Inter-Regular',
                  fontWeight: 'bold',
                }}>
                Permission!
              </Text>
            ) : null}
            {item.status == 'Pending' ? (
              <Text
                style={{
                  marginRight: 15,
                  fontSize: 15,
                  color: '#3a86ff',
                  fontFamily: 'Inter-Regular',
                  fontWeight: 'bold',
                }}>
                Pending
              </Text>
            ) : null}
            {item.status == 'Approved' ? (
              <Text
                style={{
                  marginRight: 15,
                  fontSize: 15,
                  color: '#38b000',
                  fontFamily: 'Inter-Regular',
                  fontWeight: 'bold',
                }}>
                Approved
              </Text>
            ) : null}
            {item.status == 'Others' ? (
              <Text
                style={{
                  marginRight: 15,
                  fontSize: 15,
                  color: '#ffc857',
                  fontFamily: 'Inter-Regular',
                  fontWeight: 'bold',
                }}>
                Others
              </Text>
            ) : null}
          </Hstack>
          <Text
            style={{
              margin: 10,
              fontSize: 15,
              color: '#333333',
              fontFamily: 'Inter-Regular',
              // flex: 1,
              width: Dimensions.get('window').width - 40,
              // width: '20%',
            }}>
            {item.description.substring(0, 150)}
            {item.description.length > 150 ? '...' : null}
          </Text>
          <Hstack centered>
            <Text
              style={{
                marginLeft: 10,
                fontSize: 15,
                color: '#33333390',
                fontFamily: 'Inter-Regular',
                fontStyle: 'italic',
                // flex: 1,
                // backgroundColor: 'green',
              }}>
              Assignor : {item.assignor}
            </Text>
          </Hstack>
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
              width: Dimensions.get('window').width - 25,
              // flex: 1,
            }}>
            <Custombutton
              title="Approve"
              color="#111"
              // onPress={() => alert('Note sheet is approved')}>
              onPress={() =>
                Alert.alert('', 'Note sheet is approved', [
                  { text: 'OK', onPress: () => console.log('OK Pressed') },
                ])
              }>
              <Feather
                name="check"
                size={24}
                style={{ color: '#2b9348', marginTop: 2 }}
              />
            </Custombutton>
            <Custombutton
              title="Reject"
              color="#111"
              onPress={() =>
                Alert.alert('', 'Note sheet is Rejected', [
                  { text: 'OK', onPress: () => console.log('OK Pressed') },
                ])
              }>
              <Entypo
                name="cross"
                size={24}
                style={{ color: '#E53E3E', marginRight: 0 }}
              />
            </Custombutton>
            <Custombutton
              title="Meet"
              color="#111"
              onPress={() =>
                Alert.alert('', 'Notified converners to met in person', [
                  { text: 'OK', onPress: () => console.log('OK Pressed') },
                ])
              }>
              <MaterialCommunityIcons
                name="account-clock-outline"
                size={24}
                style={{ color: '#DD6B20', marginRight: 0 }}
              />
            </Custombutton>
            <Custombutton
              title="Fwd"
              color="#111"
              // onPress={() => (alert('To select to forward'))}>
              onPress={() =>
                Alert.alert('', 'To select to forward', [
                  { text: 'OK', onPress: () => console.log('OK Pressed') },
                ])
              }>
              <MaterialCommunityIcons
                name="fast-forward"
                size={24}
                style={{ color: '#3182CE99', marginRight: 0 }}
              />
            </Custombutton>
          </Hstack>
        )}
      </View>
    </Pressable>
  );
};

const Options = ({ showbuttons, Approved, filterData }) => {
  const [visible, setVisible] = useState(false);
  const [buttons, setbuttons] = useState(false);
  const [status, setstatus] = useState(false);
  const [data, setData] = useState([]);
  const [limit, setlimit] = useState(10);
  const searchRef = useRef();
  const [oldData, setOldData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // console.log(bigCities);
  const Tempdata = [];

  const FilteredData = Itemsdata => {
    for (let i = 0; i < Itemsdata.length; i++) {
      if (Itemsdata[i].status === filterData) {
        Tempdata.push(Itemsdata[i]);
      }
    }

    return Tempdata;
  };
  const fetchdata = async () => {
    const res = await fetch(`https://dummyjson.com/products/?limit=${limit}`);
    setLoading(false);
    const json = await res.json();
    // setlimit(limit + 10);
    let response = json.products;
    filterData ? setData(FilteredData(Itemsdata)) : setData(Itemsdata);

    // setData(Itemsdata);
    setOldData(response);
  };

  useEffect(() => {
    setLoading(true);
    fetchdata();
  }, []);

  const onRefresh = () => {
    setLoading(true);
    fetchdata();
  };

  return (
    <View style={{ flex: 1 }}>
      {/* <CustomHeader search={search} searchFilterFunction={searchFilterFunction} setSearch={setSearch} searchRef={searchRef} setVisible={setVisible}/> */}
      {showbuttons ? (
        <Hstack centered styles={{ padding: 10, backgroundColor: colors.tempbg }}>
          <View style={{ flex: 1 }} />
          <ToggleSwitch
            isOn={buttons}
            onColor="#3182CE"
            offColor={α(colors.primary, 0.2)}
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
        </Hstack>
      ) : null}
      <FlatList
        data={data}
        // stickyHeaderHiddenOnScroll
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <Rendertask
              item={item}
              index={index}
              data={data}
              buttons={buttons}
            />
          );
        }}
        onRefresh={onRefresh}
        onEndReached={fetchdata}
        refreshing={Loading}
        removeClippedSubviews={true}
        onEndReachedThreshold={0.5}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        style={{ flex: 1, backgroundColor: colors.tempbg }}
        // style={{ flex: 1, backgroundColor: α(colors.primary, 0.1) }}
        contentContainerStyle={[{}]}
        ListFooterComponent={<View style={{ paddingBottom: 70 }} />}
        ListEmptyComponent={
          <View style={{ flex: 1 }}>
            {Loading ? (
              <View
                style={{
                  height: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: 100,
                  marginBottom: 30,
                  marginTop: -7,
                }}>
                <ActivityIndicator animating color="#3182CE99" size={35} />
              </View>
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '400',
                    color: '#000',
                  }}>
                  No data to Show
                </Text>
              </View>
            )}
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
            backgroundColor: α(colors.primary, 1),
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
