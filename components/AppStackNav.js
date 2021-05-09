import * as React from "react";
import { createStackNavigator } from "react-navigation-stack";
import MovieScreen from "../Screens/MovieSearch";
import MoviePlot from "../Screens/MoviePlot";

export const AppStackNavigator = createStackNavigator(
  {
    MovieScreen: {
      screen: MovieScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    AboutMovie: { screen: MoviePlot },
  },
  { initialRouteName: "MovieScreen" }
);
