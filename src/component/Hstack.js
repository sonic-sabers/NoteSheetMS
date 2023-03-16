import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Hstack({ children, between, styles, centered }) {
    // const justifyContent = between ? 'space-between' : null;
    return (
        <View style={[
            {
                justifyContent: between ? 'space-between' : null,
                alignItems: centered ? 'center' : null,
            }
            , styles, { flexDirection: 'row' }]}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({})