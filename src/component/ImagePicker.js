// import React,
// {
//   Component,
//   useState,
//   useEffect,
//   useRef
// } from 'react';
// import {
//   StyleSheet,
//   Button,
//   Image,
//   Text,
//   TouchableOpacity,
//   View,
//   TextInput,
//   ScrollView,
//   KeyboardAvoidingView,
//   SafeAreaView,
//   ImageBackground,
//   FlatList,
//   ViewPropTypes,
//   Switch,
//   Dimensions,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { colors } from '../constants';
// import LinearGradient from 'react-native-linear-gradient';

// import Feather from 'react-native-vector-icons/Feather';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Entypo from 'react-native-vector-icons/Entypo';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// // import RBSheet from 'react-native-raw-bottom-sheet';
// import ImagePickerCropper from 'react-native-image-crop-picker';


// export default function ImagePicker() {

//   const inputRef = React.useRef()

//   const options = [
//     {
//       name: 'Take from camera',
//       icon: <Ionicons color={colors.grey} size={21} name="camera" />,
//       onPress: () => {
//         ImagePickerCropper.openCamera({
//           width: 300,
//           height: 300,
//           cropping: true,
//           freeStyleCropEnabled: true,
//         })
//           .then((images) => {
//             onFileSelected(images);
//           })
//           .catch((error) => { });
//       },
//     },
//     {
//       name: 'Choose from Gallery',
//       icon: <Ionicons name="image" color={colors.grey} size={21} />,
//       onPress: () => {
//         ImagePickerCropper.openPicker({
//           width: 300,
//           height: 300,
//           cropping: true,
//           freeStyleCropEnabled: true,
//         })
//           .then((images) => {
//             onFileSelected(images);
//           })
//           .catch((error) => { });
//       },
//     },
//   ];
//   return (
//     <RBSheet
//       ref={ref}
//       height={190}
//       openDuration={250}
//       dragFromTopOnly
//       closeOnDragDown
//       customStyles={{
//         container: {
//           borderTopRightRadius: 20,
//           borderTopLeftRadius: 20,
//         },
//       }}>
//       <View style={styles.optionsWrapper}>
//         {options.map(({ name, onPress, icon }) => (
//           <TouchableOpacity
//             onPress={onPress}
//             style={styles.pickerOption}
//             key={name}>
//             {icon}
//             <Text style={styles.text}>{name}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </RBSheet>
//   )
// }

// const styles = StyleSheet.create({})
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function ImagePicker() {
  return (
    <View>
      <Text>ImagePicker</Text>
    </View>
  )
}

const styles = StyleSheet.create({})