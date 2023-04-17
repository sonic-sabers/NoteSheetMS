/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Pressable,
  UIManager,
  Platform,
  ActivityIndicator,
  Alert,
  StyleSheet,
  Modal,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Hstack from '../component/Hstack';
import ToggleSwitch from 'toggle-switch-react-native';
import α from 'color-alpha';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../constants';
import { Itemsdata } from '../database/Database';
import ModalDropdown from 'react-native-modal-dropdown';
import { useSelector, useDispatch } from 'react-redux';
import { CustomTextInput } from './CreateNotesheet';

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
          height: 50,
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

export const Rendertask = ({
  item,
  buttons,
  data,
  index,
  fromFilter,
  setModalVisible,
  searchFilterFunction,
}) => {
  const navigation = useNavigation();
  const customPress = item =>
    fromFilter
      ? (searchFilterFunction(''),
        setModalVisible(false),
        navigation.navigate('Detailednote', { item }))
      : navigation.navigate('Detailednote', { item });
  const [remarkModalVisible, setRemarkModalVisible] = useState(false);
  const [Subject, setSubject] = useState(null);

  return (
    <View>
      <Pressable
        key={item.id}
        onPress={() => customPress(item)}
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
          shadowColor: '#f77f00',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.32,
          shadowRadius: 5.46,

          elevation: 9,

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
                Date : {item?.eventDate ? item?.eventDate : '24-4-2023'}
              </Text>
              {item.status === 'Permission' ? (
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
              {item.status === 'Pending' ? (
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
              {item.status === 'Approved' ? (
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
              {item.status === 'Others' ? (
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
              {item?.description.substring(0, 150)}
              {item?.description.length > 150 ? '...' : null}
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
                Assignor : {item?.assignor}
              </Text>
            </Hstack>
          </View>
          {/* {item.status === 'Permission' ? (
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
              ) : null} */}
          {(buttons && item.status === 'Permission') ? (
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
                title="Remark"
                color="#111"
                onPress={() =>
                  // Alert.alert('', 'Note sheet is Remarked', [
                  //   { text: 'OK', onPress: () => console.log('OK Pressed') },
                  // ])
                  setRemarkModalVisible(true)
                }>
                <MaterialCommunityIcons
                  name="message"
                  size={24}
                  style={{ color: '#dddf00', marginTop: 2 }}
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
                onPress={() => navigation.navigate('Forwardscreen')}>
                <MaterialCommunityIcons
                  name="fast-forward"
                  size={24}
                  style={{ color: '#3182CE99', marginRight: 0 }}
                />
              </Custombutton>
            </Hstack>
          ) : null}
        </View>
      </Pressable>
      <Pressable
        style={styles.centeredView}
        // onPress={() => console.log(modalVisible)}
        onPress={() => setRemarkModalVisible(false)}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={remarkModalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setRemarkModalVisible(!remarkModalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{ flex: 1 }}>
                <CustomTextInput
                  title="Remark"
                  onChangeText={setSubject}
                  text={Subject}
                  placeholdervalue="Enter Remark on Notesheet"
                  styles={{
                    height: 40,
                    backgroundColor: 'red'
                  }}
                />
                <View style={{ flex: 1 }} />
                <TouchableOpacity
                  onPress={() => setRemarkModalVisible(false)}
                  style={{
                    // padding: 10,
                    backgroundColor: '#ca4b0b',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                    marginTop: 35,
                    // opacity: 0.9,
                    height: 50,
                  }}>
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: '500',
                      color: '#fff',
                    }}>
                    Send Remark
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </Pressable>
    </View>
  );
};

const Temp_sort = [
  { name: 'I Recieved', age: 30 },
  { name: 'I Created', age: 25 },
];

const Options = ({ showbuttons, Approved, filterData, showFilter }) => {
  const [buttons, setbuttons] = useState(true);
  const [status, setstatus] = useState(false);
  const [data, setData] = useState([]);
  const [limit, setlimit] = useState(10);
  const searchRef = useRef();
  const [oldData, setOldData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [sortBy, setSortBy] = useState('All');
  const [activeTags, setActiveTags] = useState(['All']);
  const [activeTagId, setActiveTagId] = useState('All');
  // console.log('activeTags', sortBy);
  const Tempdata = [];
  const dropdown_2 = useRef();
  const Counts = useSelector(store => store.count.count);

  const sortBarTitleRef = useRef();
  const FilteredData = Itemsdata => {
    for (let i = 0; i < Itemsdata.length; i++) {
      if (Itemsdata[i].status === filterData) {
        Tempdata.push(Itemsdata[i]);
      }
    }
    return Tempdata;
  };
  const FilteredUserData = Itemsdata => {
    for (let i = 0; i < Itemsdata.length; i++) {
      if (Itemsdata[i].status === filterData) {
        Tempdata.push(Itemsdata[i]);
      }
    }
    return Tempdata;
  };
  const FilteredAllUserData = Itemsdata => {
    for (let i = 0; i < Itemsdata.length; i++) {
      if (Itemsdata[i].status != 'Permission') {
        Tempdata.push(Itemsdata[i]);
      }
    }
    return Tempdata;
  };
  const fetchdata = async () => {
    // const { sortBy } = props;
    const res = await fetch(`https://dummyjson.com/products/?limit=${limit}`);
    setLoading(false);
    console.log('sortBy 1', sortBy);

    const json = await res.json();
    // setlimit(limit + 10);
    let response = json.products;
    if (!Counts && !filterData) {
      setData(FilteredAllUserData(Itemsdata));
    } else if (!Counts) {
      setData(FilteredUserData(Itemsdata));
    } else if (filterData) {
      setData(FilteredData(Itemsdata));
    } else if (sortBy === 'I Created') {
      setData(FilteredAllUserData(Itemsdata));
    } else {
      setData(Itemsdata);
    }
    setLoading(false);

    // setData(Itemsdata);
    setOldData(response);
  };
  // const setActivetags = () => {
  useEffect(() => {
    fetchdata(sortBy);
  }, [sortBy]);

  useEffect(() => {
    fetchdata();
  }, [Counts]);

  const setActivetags = () => {
    const TagFields = Temp_sort.map(({ age, ...name }) => {
      return name;
    });
    const TagNames = TagFields.map(item => item.name);
    TagNames.unshift('All');
    setActiveTags(TagNames);
  };
  useEffect(() => {
    setLoading(true);
    fetchdata();
    setActivetags();
  }, []);

  const onRefresh = () => {
    setLoading(true);
    fetchdata();
  };

  const RenderSortBar = () => {
    let sortSelectorTopPosition = 0;
    const getContentTopPosition = () => {
      sortBarTitleRef.current?.measureInWindow((x, y) => {
        sortSelectorTopPosition = y;
      });
    };

    const renderRow = option => {
      return (
        <View style={styles.sortBarOption}>
          <Text
            numberOfLines={1}
            style={[styles.sortBarOptionText, { color: colors.mytext }]}>
            {option}
          </Text>
        </View>
      );
    };

    const handleSelect = (index, value) => {
      setSortBy(value);
    };

    return (
      <View style={styles.sortBar}>
        <Text
          ref={sortBarTitleRef}
          style={[styles.sortBarTitleText, { color: '#888' }]}>
          Sort by :
        </Text>
        <ModalDropdown
          options={activeTags}
          renderButtonComponent={React.forwardRef((btnProps, ref) => {
            return (
              <TouchableOpacity
                id={sortBy}
                style={[styles.sortBarSelectionBtn, { marginRight: 10 }]}
                onPress={() => {
                  getContentTopPosition();
                  btnProps.onPress();
                }}
                ref={ref}>
                <Text
                  style={[
                    styles.sortBarSelectionBtnText,
                    { color: colors.mytext },
                  ]}>
                  {sortBy}
                </Text>
                <Feather
                  style={[
                    styles.sortBarSelectionBtnIcon,
                    { color: colors.mytext },
                  ]}
                  name="chevron-down"
                  size={18}
                />
              </TouchableOpacity>
            );
          })}
          renderRow={renderRow}
          onSelect={handleSelect}
          showsVerticalScrollIndicator={false}
          saveScrollPosition={false}
          // style={{ backgroundColor: 'red' }}
          dropdownStyle={[
            styles.sortBarDropdownStyle,
            {
              backgroundColor: colors.white,
              borderColor: α(colors.primary, 0.2),
              shadowColor: colors.primary,
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.29,
              shadowRadius: 4.65,

              elevation: 7,
              marginTop: 4,
            },
          ]}
          adjustFrame={frameStyle => {
            const top = sortSelectorTopPosition
              ? sortSelectorTopPosition + 24
              : frameStyle.top;
            return { ...frameStyle, top };
          }}
        />
      </View>
    );
  };

  const _renderHeader = () => {
    return (
      <View>
        {!showbuttons ? (
          <RenderSortBar />
        ) : (
          <Hstack
            centered
            styles={{ padding: 10, backgroundColor: colors.tempbg }}>
            <View style={{ flex: 1 }} />
            <ToggleSwitch
              isOn={buttons}
              onColor="#3182CE"
              offColor={α(colors.primary, 0.2)}
              label="Show buttons"
              labelStyle={{ color: 'black', fontWeight: '900' }}
              size="small"
              onToggle={abc => {
                setbuttons(!buttons);
              }}
            />
          </Hstack>
        )}
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
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
        ListHeaderComponent={Counts && _renderHeader()}
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
                  // height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: 100,
                  // marginBottom: 30,
                  marginTop: -40,
                }}>
                <ActivityIndicator
                  animating
                  color="#3182CE99"
                  size={30}
                  style={{
                    backgroundColor: '#fff',
                    // backgroundColor: α(colors.primary, 0.2),
                    padding: 4,
                    borderRadius: 50,
                    shadowColor: colors.primary,
                    shadowOffset: {
                      width: 0,
                      height: 9,
                    },
                    shadowOpacity: 0.48,
                    shadowRadius: 11.95,

                    elevation: 18,
                  }}
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
                  No Note sheet to Show
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
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000030',
  },
  modalView: {
    margin: 20,
    height: '50%',
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    // justifyContent: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  sortBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    paddingRight: 5,
    paddingVertical: 5,
    marginTop: 7,
    // marginTop: -10,
    // backgroundColor: α(colors.primary, 0.14),
  },
  sortBarTitleText: {
    // ...subText,
    marginRight: 4,
  },
  sortBarSelectionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortBarSelectionBtnText: {
    // ...subText,
  },
  sortBarSelectionBtnIcon: {
    marginLeft: 2,
  },
  sortBarDropdownStyle: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginLeft: -8,
    borderWidth: 1,
    borderTopWidth: 0,
    paddingBottom: 4,
    maxHeight: 110,
    overflow: 'hidden',
    marginRight: -3,
  },
  sortBarOption: {
    borderWidth: 0,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    minWidth: 100,
    backgroundColor: '#fff',
  },
  sortBarOptionText: {
    // ...subText,
  },
});
