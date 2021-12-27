import React from 'react';
import axios  from 'axios';
import { Navigation } from 'react-native-navigation'
import {View, Image,Text, StyleSheet, Animated,ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {goToAuth, goHome} from './navigation';

import {USER_KEY} from './config';

export default class Initialising extends React.Component {
  state = {
    SlideInRight: new Animated.Value(0),
    SlideInDown: new Animated.Value(0),

  
    // rotateValue: new Animated.Value(0),
  };
  async componentDidMount() {
    this._start();
    try {
      const token = await AsyncStorage.getItem(USER_KEY);
      console.log('user: ', token);
      if (token) {
        res = await axios.get('http://localhost:8005/users/registered', {
          headers: {
            token: token,
          },
        });
      
        setTimeout(() => {
          goHome();
        }, 4000);
      } else {
        setTimeout(() => {
          goToAuth();
        }, 4000);
      }
    } catch (err) {
      console.log('error: ', err);
      setTimeout(() => {
        goToAuth();
      }, 4000);
    }
  }
 
  _start = () => {
    return Animated.sequence([

      Animated.timing(this.state.SlideInRight, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true
      }),
      Animated.timing(this.state.SlideInDown, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true
      }),
    
    ]).start();

  };
  render() {
    let {SlideInRight,SlideInDown}=this.state;
    return (
      <View style={styles.container}>
       <View style={styles.titleContainer}>
       <Animated.View
          style={{
            transform: [
              {
                translateX: SlideInRight.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-600, 0]
                })
              }
            ],
          }}>
          <Text
            style={styles.text
            
            }>
            Gaming
          </Text>
        </Animated.View>
        <Animated.View
          style={{
            transform: [
              {
                translateY: SlideInDown.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-600, 0]
                })
              }
            ],
          }}>
          <Text
            style={styles.text
            
            }>
            station
          </Text>
        </Animated.View>
    
       </View>
        <View style={styles.loadingSpinner}></View>
        <ActivityIndicator size="large" color="#ffffff" />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 28,
  },
  container: {
    backgroundColor: '#464edb',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingSpinner:{
    marginTop:80
  },
  titleContainer:{
    display:'flex',
    flexDirection:'row'
  },
  text:{  fontSize: 30,
    color: '#fff',
   margin:5,
    fontWeight: 'bold',
    textAlign: 'center',},

});
