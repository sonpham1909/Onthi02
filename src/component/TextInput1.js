import { StyleSheet, Text, View,TextInput } from 'react-native'
import React from 'react'

const TextInput1 = ({plahoder,value,onChangeText}) => {
  return (
    <View>
     <TextInput placeholder={plahoder} value={value} onChangeText={onChangeText} style={{height:40,margin:10}} />
    </View>
  )
}

export default TextInput1

const styles = StyleSheet.create({})