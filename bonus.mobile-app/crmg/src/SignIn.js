import React from 'react';
import axios from 'axios';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {goHome} from './navigation';
import {USER_KEY} from './config';

export default class SignIn extends React.Component {
  state = {
    email: '',
    password: '',
    loginCorrect:true,
  };
  onChangeText = (key, value) => {
    this.setState({[key]: value});
  };
  signIn = async () => {
    const {email, password} = this.state;
    
    try {
      const res = await axios.post('http://localhost:8005/users/signin', {
        email: email,
        password: password,
      });
      const user = await AsyncStorage.setItem(USER_KEY, res.data);
      console.log('user successfully signed in!', user);
      goHome();
    } catch (err) {
      console.log('error:', err);
      this.setState({['loginCorrect']:false})
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="email"
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor="white"
          onChangeText={val => this.onChangeText('email', val)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          autoCapitalize="none"
          secureTextEntry={true}
          placeholderTextColor="white"
          onChangeText={val => this.onChangeText('password', val)}
        />
        <View style={styles.button}>
            {!this.state.loginCorrect?<Text>Incorrect user name or password</Text>:null}
        <Button  title="Sign In" onPress={this.signIn} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    errorMsg:{
    width: 350,
    fontSize: 18,
    fontWeight: '500',
    height: 55,

    },
    button:{
      
        marginTop:60
        
    },
    input: {
    width: 350,
    fontSize: 18,
    fontWeight: '500',
    height: 55,
    backgroundColor: '#42A5F5',
    margin: 10,
    color: 'white',
    padding: 8,
    borderRadius: 14,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
