import * as React from 'react';
import {View} from 'react-native';
import {createAppContainer,createSwitchNavigator} from "react-navigation"
import SignUpLoginScreen from "./Screens/SignUpLoginScreen";
import HomeScreen from "./Screens/HomeScreen"
import DisplayScreen from "./Screens/DisplayScreen"
import {AppDrawerNavigator} from "./components/AppDrawerNavigator"

export default class App extends React.Component {
  render() {
    return (
      <AppContainer/>
    );
  }
}

var SwitchNavigator= createSwitchNavigator({
  SignUpLoginScreen:{screen:SignUpLoginScreen},
  HomeScreen:{screen:HomeScreen},
  DisplayScreen:{screen:AppDrawerNavigator}
})

const AppContainer=createAppContainer(SwitchNavigator)
