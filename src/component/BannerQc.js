import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const BannerQc = () => {
  return (
    <View>
      <Text style={{fontSize:20,fontWeight:'bold',textAlign:'center'}}>Big Sale</Text>
      <Image source={require('../image/imgepl.jpg') }  style={{width:100,height:100,alignSelf:'center'}}/>

    </View>
  )
}

export default BannerQc

const styles = StyleSheet.create({})