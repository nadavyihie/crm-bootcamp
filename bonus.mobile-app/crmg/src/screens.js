import {Navigation} from 'react-native-navigation';

export function registerScreens() {
  Navigation.registerComponent('Home', () => require('./Home').default);
  Navigation.registerComponent(
    'Initializing',
    sc => require('./Initializing').default,
  );
  Navigation.registerComponent('SignIn', () => require('./SignIn').default);

  }