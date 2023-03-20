import { KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard, StyleSheet, Text, View } from 'react-native'
import React from 'react'
// import { } from 'react-native-gesture-handler'

export default function KeyboardavoidingWrapper({ children, style }) {
    return (
        <KeyboardAvoidingView style={{ flex: 1 ,}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={style}>
                <ScrollView style={{ flex: 1, backgroundColor: '#ff6801' }}>
                    {/* <Text
                        style={{
                            fontSize: 20,
                            fontWeight: '400',
                            fontFamily: 'Poppins-Regular',
                            color: '#000'
                        }}>
                        text
                    </Text> */}
                    {children}
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({})