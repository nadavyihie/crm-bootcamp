import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {View, Text, Button, StyleSheet,TouchableOpacity,Alert} from 'react-native';
import {goToAuth} from './navigation';
import {Navigation} from 'react-native-navigation';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';

import {USER_KEY, ACCOUNT_ID} from './config';

export default class Home extends React.Component {
  state = {
    tableHead: [ 'client name', 'game name','start date','end date',''],
    tableData: [],
    rentalsArr:[]
  }

  async componentDidMount() {
    try {
      const accountID = await AsyncStorage.getItem(ACCOUNT_ID);

      res = await axios.post(`http://localhost:991/rentals/readAllRentals/`, {
        id: accountID,
      });
      const tableData=res.data.rentals.map((rental,i)=>[rental.clientName,rental.gameName,rental.start_rental_date,rental.end_date,rental.id])
      console.log(tableData)
      this.setState({['tableData']:tableData})
      this.setState({['rentalsArr']:res.data.rentals})
      console.log("blaaaaaaaaaaa")
    } catch (err) {
      console.log(err)
    }
  }
  static get options() {
    return {
      topBar: {
        title: {
          text: 'Home',
        },
      },
    };
  }

fetchRentals=async()=>{

}
  _alertIndex(index) {
    Alert.alert(`This is row ${index}`);
  }

  logout = async () => {
    try {
      await AsyncStorage.removeItem(USER_KEY);
      await AsyncStorage.removeItem(ACCOUNT_ID);
      goToAuth();

    } catch (err) {
      console.log('error signing out...: ', err);
    }
  };
  render() {


    const element = (data, index) => (
      <TouchableOpacity onPress={() => this._alertIndex(data)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>button</Text>
        </View>
      </TouchableOpacity>
    );


    return (
      <View style={styles.container}>

<Table borderStyle={{borderColor: 'transparent'}}>
          <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text}/>
          {
            this.state.tableData.map((rowData, index) => (
              <TableWrapper key={index} style={styles.row}>
                {
                  rowData.map((cellData, cellIndex) => (
                    <Cell key={cellIndex} data={cellIndex === 4 ? element(cellData, index) : cellData} textStyle={styles.text}/>
                  ))
                }
              </TableWrapper>
            ))
          }
        </Table>     
      
        <View style={styles.signOut}>
        <Button  onPress={this.logout} title="Sign Out" />
  
        </View>
        {/* <Button
          onPress={() => {
            Navigation.push(this.props.componentId, {
              component: {
                name: 'Screen2',
              },
            });
          }}
          title="View next screen"
        /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },

  signOut:{
    position: 'absolute',
    right: 5,
    top: 5,
  },
  head: { height: 40, backgroundColor: '#808B97' },
  text: { margin: 6 ,fontSize:15},
  row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
  btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' }
});
