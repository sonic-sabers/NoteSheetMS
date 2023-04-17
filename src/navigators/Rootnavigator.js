/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
} from '@react-navigation/material-top-tabs';
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Dimensions,
  Animated,
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Options} from '../screens';
import Hstack from '../component/Hstack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {colors} from '../constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Itemsdata} from '../database/Database';
import {Rendertask} from '../screens/Options';
import α from 'color-alpha';
import {useSelector, useDispatch} from 'react-redux';
import {changeCount} from '../redux/actions/counts';
// import { increment, decrement } from '../redux/actions/countAction';

const windowWidth = Dimensions.get('window').width;
function MyTabBar({state, descriptors, navigation}) {
  // }));
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [Loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const Counts = useSelector(store => store.count.count);

  const handleIncrement = () => {
    dispatch(changeCount(!Counts));
  };

  const fetchdata = async () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(responseJson => {
        setLoading(false);
        setFilteredDataSource(Itemsdata);
        setMasterDataSource(Itemsdata);
      })
      .catch(error => {
        setLoading(false);
        Alert.alert('An issue occured while fetching data');
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchdata();
  }, []);

  const searchFilterFunction = text => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.description
          ? item.description.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const onRefresh = () => {
    setLoading(true);
    fetchdata();
  };

  return (
    <View
      style={{
        backgroundColor: α(colors.primary, 0.1),
      }}>
      <Hstack
        between
        styles={{
          padding: 10,
          // backgroundColor: α(colors.primary, 0.4),
        }}>
        <Pressable style={{flex: 1}} onPress={() => setModalVisible(true)}>
          <Hstack
            centered
            styles={{
              height: 40,
              backgroundColor: colors.tempbg,
              paddingLeft: 15,
              borderRadius: 5,
              borderWidth: 0.6,
              borderColor: '#cbae12',
              flex: 1,
            }}>
            <AntDesign
              name="search1"
              size={22}
              style={{color: '#00000099', marginLeft: 0}}
            />
            <View
              // ref={searchRef}
              placeholder="Search notesheet here..."
              style={{flex: 1, marginLeft: 4, fontSize: 14, color: '#00000050'}}
              placeholderTextColor="#00000050"
              value={search}
              pointerEvents="none"
              onChangeText={txt => {
                // searchFilterFunction(txt);
                // setSearch(txt);
                setModalVisible(true);
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: '#00000050',
                }}>
                Search notesheet here...
              </Text>
            </View>
          </Hstack>
        </Pressable>
        <TouchableOpacity
          onPress={() => navigation.navigate('Userprofile')}
          style={{
            height: 40,
            width: 40,
            marginHorizontal: 10,
            // backgroundColor: '#0b0aa230',
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FontAwesome
            name="user-circle"
            size={30}
            color={colors.primary}
            style={{}}
          />
        </TouchableOpacity>
      </Hstack>
      <View
        style={{
          flex: 0,
          height: 40,
          flexDirection: 'row',
          // backgroundColor: '#caf0f830',
          borderBottomColor: '#ffffff',
          // backgroundColor: α(colors.primary, 0.00),
          // borderBottomWidth: 1,
        }}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            {
              /* handleIncrement(); */
            }
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate({name: route.name, merge: true});
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={route.name}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomColor: isFocused ? colors.primary : 'transparent',
                borderBottomWidth: 1,
                marginBottom: 1,
              }}>
              <Animated.Text
                style={{
                  flex: 0,
                  width: windowWidth / 3,
                  textAlign: 'center',
                  // ...subTextThic,
                  color: isFocused ? colors.primary : '#495057',
                  fontWeight: '600',
                }}>
                {label}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        animated={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          searchFilterFunction('');
        }}>
        {modalVisible ? (
          <Pressable
            onPress={() => {
              setModalVisible(!modalVisible);
              searchFilterFunction('');
            }}
            style={{flex: 1, backgroundColor: '#fff'}}>
            <Hstack centered styles={{width: '100%'}}>
              <Pressable onPress={() => setModalVisible(false)}>
                <Feather
                  name="arrow-left"
                  size={30}
                  style={{
                    color: '#00000099',
                    alignSelf: 'center',
                    marginTop: 10,
                    marginLeft: 9,
                  }}
                />
              </Pressable>
              <Hstack
                centered
                styles={{
                  height: 40,
                  backgroundColor: colors.tempbg,
                  paddingLeft: 15,
                  borderRadius: 5,
                  borderWidth: 0.6,
                  borderColor: '#cbae12',
                  marginTop: 10,
                  marginHorizontal: 10,
                  // width: '100%'
                  flex: 1,
                  marginLeft: 5,
                }}>
                <AntDesign
                  name="search1"
                  size={22}
                  style={{color: '#00000099', marginLeft: -5}}
                />
                <TextInput
                  // ref={searchRef}
                  placeholder="Search notesheet here..."
                  style={{
                    height: 40,
                    marginLeft: 4,
                    fontSize: 14,
                    color: '#00000050',
                    flex: 1,
                  }}
                  placeholderTextColor="#00000050"
                  // value={search}
                  autoFocus={true}
                  onChangeText={searchFilterFunction}
                  value={search}
                  underlineColorAndroid="transparent"
                  // onChangeText={txt => {
                  //   // searchFilterFunction(txt);
                  //   setSearch(txt);
                  // }}
                />
                {search.length ? (
                  <TouchableOpacity onPress={() => searchFilterFunction('')}>
                    <AntDesign
                      name="close"
                      size={22}
                      style={{color: '#00000099', marginRight: 8}}
                    />
                  </TouchableOpacity>
                ) : null}
              </Hstack>
            </Hstack>
            <FlatList
              data={filteredDataSource}
              keyExtractor={(item, index) => index.toString()}
              onRefresh={onRefresh}
              refreshing={Loading}
              removeClippedSubviews={true}
              onEndReachedThreshold={0.5}
              initialNumToRender={10}
              maxToRenderPerBatch={10}
              style={{flex: 1, backgroundColor: colors.tempbg}}
              // style={{ flex: 1, backgroundColor: α(colors.primary, 0.1) }}
              contentContainerStyle={[{}]}
              ListFooterComponent={<View style={{paddingBottom: 70}} />}
              ListEmptyComponent={
                <View style={{flex: 1}}>
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
                      <ActivityIndicator
                        animating
                        color="#3182CE99"
                        size={35}
                      />
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
                        Notesheet is not available
                      </Text>
                    </View>
                  )}
                </View>
              }
              renderItem={({item, index}) => {
                return (
                  <Rendertask
                    item={item}
                    index={index}
                    data={filteredDataSource}
                    fromFilter
                    setModalVisible={setModalVisible}
                    searchFilterFunction={searchFilterFunction}
                  />
                );
              }}
            />
          </Pressable>
        ) : null}
      </Modal>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  const Counts = useSelector(store => store.count.count);

  return (
    <Tab.Navigator
      initialRouteName="All"
      screenOptions={{
        lazy: true,
        showIcon: false,
        activeTintColor: '#080808',
        animationEnabled: true,
        swipeEnabled: true,
      }}
      tabBar={props => <MyTabBar theme {...props} />}
      sceneContainerStyle={{backgroundColor: '#bceaba20'}}
      initialLayout={{
        width: Dimensions.get('window').width,
        // backgroundColor: theme?.card_bg || '#fff',
        backgroundColor: '#ffffff',
      }}>
      {Counts ? (
        <Tab.Screen
          name="C2"
          // component={Options}
          children={() => (
            <Options showbuttons Approved filterData="Permission" />
          )}
          options={{
            tabBarLabel: 'C2',
            // tabBarItemStyle: { width: 10 }, showFilter
            tabBarItemStyle: {minWidht: '10', backgroundColor: 'red'},
            tabBarContentContainerStyle: {
              minWidht: '10',
              backgroundColor: 'red',
            },
          }}
        />
      ) : null}
      <Tab.Screen
        name="All"
        component={Options}
        // children={() => <Options showbuttons={false} />}
        options={{
          tabBarLabel: 'All',
          tabBarBounces: true,
          tabBarItemStyle: {
            flex: 1,
          },
          tabBarStyle: {
            flex: 1,
          },
        }}
      />
      <Tab.Screen
        name="Approved"
        // component={Options}
        children={() => <Options filterData="Approved" />}
        // children={() => <Options Approved filterData="Approved" />}
        options={{tabBarLabel: 'Approved'}}
      />
      <Tab.Screen
        name="Pending"
        // component={Options}
        children={() => (
          <Options showFilter={Counts ? true : null} filterData="Pending" />
        )}
        options={{tabBarLabel: 'Pending'}}
      />
      <Tab.Screen
        name="Others"
        children={() => (
          <Options showFilter={Counts ? true : null} filterData="Others" />
        )}
        options={{tabBarLabel: 'Others'}}
      />
    </Tab.Navigator>
  );
}
export default function Root() {
  return <MyTabs />;
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
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
    marginBottom: 15,
    textAlign: 'center',
  },
  container: {
    backgroundColor: 'white',
  },
  itemStyle: {
    padding: 10,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
});
