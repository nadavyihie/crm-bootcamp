import React from 'react';
import axios from 'axios';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {goHome} from './navigation';
import {USER_KEY,ACCOUNT_ID} from './config';

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
      const user = await AsyncStorage.setItem(USER_KEY, res.data.token);
      const accouID=res.data.accountID.toString();
      const accountID=await AsyncStorage.setItem(ACCOUNT_ID,accouID)
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
            {!this.state.loginCorrect?<Text style={styles.errorMsg}>Incorrect user name or password</Text>:null}
        <Button  title="Sign In" onPress={this.signIn} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    errorMsg:{
       color:'red',
        marginTop:20,
        marginBottom:10
    },
    button:{
      
        marginTop:20
        
    },
    input: {
    width: 350,
    fontSize: 18,
    fontWeight: '500',
    height: 55,
    backgroundColor: '#464edb',
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
