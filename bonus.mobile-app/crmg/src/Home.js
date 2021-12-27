import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment';
import SelectDropdown from 'react-native-select-dropdown';
import {
  FlatList,
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Pressable,
  Modal,
} from 'react-native';
import {goToAuth} from './navigation';
import {Navigation} from 'react-native-navigation';
import {Table, TableWrapper, Row, Cell} from 'react-native-table-component';

import {USER_KEY, ACCOUNT_ID} from './config';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showOkButton: false,
      selectedMonth: '',
      rentals: [],
      selectedRental: {},
      offset: 0,
      modalVisible: false,
    };
  }

  async componentDidMount() {
    this.fetchRentals();
  }

  static get options() {
    return {
      topBar: {
        title: {
          text: 'Rentals',
        },
      },
    };
  }
  range = (start, end) => {
    const arr = [];
    for (let i = start; i <= end; i++) {
      arr.push(i);
    }
    return arr;
  };
  fetchMoreRentals = () => {
    this.setState(
      prevState => ({
        offset: prevState.offset + 5,
      }),
      () => {
        this.fetchRentals();
      },
    );
  };

  fetchRentals = async () => {
    try {
      const accountID = await AsyncStorage.getItem(ACCOUNT_ID);

      res = await axios.post(
        `http://localhost:991/rentals/readLimitedRentals/`,
        {
          id: accountID,
          offset: this.state.offset,
        },
      );

      this.setState({
        rentals: this.state.rentals.concat(res.data.rentals),
      });
    } catch (err) {
      console.log(err);
    }
  };

  logout = async () => {
    try {
      await AsyncStorage.removeItem(USER_KEY);
      await AsyncStorage.removeItem(ACCOUNT_ID);
      goToAuth();
    } catch (err) {
      console.log('error signing out...: ', err);
    }
  };

  editRental = async () => {
    try {
      res = await axios.post('http://localhost:991/rentals/update/', {
        id: this.state.selectedRental.id,
        rental_months: this.state.selectedMonth,
      });
    } catch (err) {
      console.log(err);
    }
    this.setState({['modalVisible']: false});
    var new_date = moment(
      this.state.selectedRental.start_rental_date,
      'YYYY-MM-DD',
    ).add(this.state.selectedMonth, 'months');
    new_date = new_date.format('YYYY-MM-DD');
    tempRentals = this.state.rentals;
    for (const rental of tempRentals) {
      if (rental.id == this.state.selectedRental.id) {
        rental.end_date = new_date;
        break;
      }
    }
    this.setState({rentals: tempRentals});
  };
  openModal = item => {
    console.log(item);
    this.setState({['modalVisible']: true});
    this.setState({['selectedRental']: item});
  };
  closeModal = () => {
    this.setState({['modalVisible']: false});
  };
  render() {
    const countries = ['Egypt', 'Canada', 'Australia', 'Ireland'];
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={{
            backgroundColor: '#FBFBF8',
            marginLeft: 10,
            marginTop: 35,
            alignItems: 'center',
          }}
          data={this.state.rentals}
          onEndReached={this.fetchMoreRentals}
          onEndReachedThreshold={0.5}
          renderItem={({item}) => (
            <TouchableOpacity
              style={{
                padding: 2,
                borderWidth: 1,
                backgroundColor: '#E5C682',
                borderColor: 'thistle',
                borderRadius: 20,

                width: 200,
                marginTop: 10,
              }}
              onPress={() => {
                this.openModal(item);
              }}>
              <Text style={styles.text}>
                <Text style={{fontWeight: 'bold'}}>Client name: </Text>
                {item.clientName}
              </Text>
              <Text style={styles.text}>
                <Text style={{fontWeight: 'bold'}}>Game name:</Text>
                {item.gameName}
              </Text>
              <Text style={styles.text}>
                <Text style={{fontWeight: 'bold'}}>Start date:</Text>
                {item.start_rental_date}
              </Text>
              <Text style={styles.text}>
                <Text style={{fontWeight: 'bold'}}>End date:</Text>
                {item.end_date}
              </Text>
            </TouchableOpacity>
          )}
        />

        <View style={styles.signOut}>
          <Button onPress={this.logout} title="Sign Out" />
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!this.state.tmodalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.text}>Select rental months:</Text>

              <SelectDropdown
                data={this.range(this.state.selectedRental.rental_months, 12)}
                onSelect={(selectedItem, index) => {
                  this.setState({['selectedMonth']: selectedItem});
                  this.setState({['showOkButton']: true});
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
              />

              {this.state.showOkButton ? (
                <Pressable
                  style={[styles.button, styles.buttonOk]}
                  onPress={this.editRental}>
                  <Text style={styles.textStyle}>Ok</Text>
                </Pressable>
              ) : null}
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={this.closeModal}>
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },

  signOut: {
    position: 'absolute',
    right: 0,
    top: 0,
  },

  text: {margin: 6, fontSize: 15},
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    height: 250,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    marginTop: 10,
    backgroundColor: '#2196F3',
  },
  buttonOk: {
    marginTop: 5,

    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    textAlign: 'center',
  },
});
