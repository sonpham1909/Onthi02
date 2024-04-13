import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BannerQc from '../component/BannerQc'
import Listxemay from '../component/Listxemay'
import strore from '../redux/store/strore'
import {Provider} from 'react-redux'

const ListScreen = () => {
  return (
    <Provider store={strore}>
      <BannerQc/>
      <Listxemay/>
    </Provider>
  )
}

export default ListScreen

const styles = StyleSheet.create({})