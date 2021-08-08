
import React from 'react'
import {
  View,
  Text,
  StyleSheet,

} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { goToAuth, goHome } from './navigation'

import { USER_KEY } from './config'

export default class Initialising extends React.Component {
  async componentDidMount() {
    try {
      const token = await AsyncStorage.getItem(USER_KEY)
      console.log('user: ', token)
      if (token) {

      
            res=await axios.get('http://localhost:8005/users/registered', {
                headers: {
                  'token': token
                }
              })

              goHome()
    
        }
        else{
            goToAuth();
        }
    } catch (err) {
      console.log('error: ', err)
      goToAuth()
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Loading</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 28
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})