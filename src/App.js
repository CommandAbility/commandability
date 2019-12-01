import React from "react";
import { Button, Text, View, Dimensions } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import firebase from "@react-native-firebase/app";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import SplashScreen from "react-native-splash-screen";

import configureStore from "./modules/configureStore";
import { Loading, Login, Home, Incident, GroupPrompt } from "./screens";
import COLORS from "./modules/colors";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const { persistor, store } = configureStore();

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: COLORS.secondary.dark,
    height: SCREEN_HEIGHT / 16
  }
};

const AppStack = createStackNavigator({ Home }, { defaultNavigationOptions });
const AuthStack = createStackNavigator({ Login }, { defaultNavigationOptions });
const IncidentStack = createStackNavigator({ Incident, GroupPrompt }, {defaultNavigationOptions});

const AppNavigator = createSwitchNavigator(
  {
    Loading,
    AuthStack,
    AppStack,
    IncidentStack
  },
  {
    defaultNavigationOptions
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    );
  }
}
