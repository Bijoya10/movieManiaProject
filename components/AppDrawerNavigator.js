import * as React from "react"
import { createDrawerNavigator } from "react-navigation-drawer";
import {Icon} from "react-native-elements"
import DisplayScreen from "../Screens/DisplayScreen";
import CustomSideBarMenu from "./SideBarMenu";
import { AppStackNavigator } from "../components/AppStackNav";

export const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: { screen: DisplayScreen ,
    navigationOptions:{
      drawerIcon:<Icon name ="home" type="font-awesome"/>
    }
    },
    Movie: { screen: AppStackNavigator,
      navigationOptions:{
        drawerIcon:<Icon name ="video" type="foundation"/>
      } },
  },
  {
    contentComponent: CustomSideBarMenu,
  },
  {
    initialRouteName: "Home",
  }
);
