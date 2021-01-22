/**
 * Redux SwitchNavigator Component
 *
 * Manages re-rendering the navigation container when the navigation stack changes.
 * Based on https://reactnavigation.org/docs/auth-flow except using redux instead of the Context API.
 */

import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';

import {
  HomeScreen,
  IncidentScreen,
  EditGroupPrompt,
  EndScreen,
  ExitIncidentPrompt,
  AuthScreen,
  PersonnelPrompt,
  AddPersonPrompt,
} from './screens';
import {
  AUTH_STACK,
  HOME_STACK,
  INCIDENT_STACK,
  END_STACK,
} from './modules/navigation-stacks';
import { selectStack, selectTheme } from './redux/selectors';
import themeSelector from './modules/themes';

const Auth = createStackNavigator();
const Home = createStackNavigator();
const Incident = createStackNavigator();
const End = createStackNavigator();

const screenOptions = {
  headerShown: false,
};

const setStack = stack => {
  switch (stack) {
    case HOME_STACK:
      return (
        <Home.Navigator screenOptions={screenOptions}>
          <Home.Screen name="HomeScreen" component={HomeScreen} />
        </Home.Navigator>
      );
    case INCIDENT_STACK:
      return (
        <Incident.Navigator screenOptions={screenOptions}>
          <Incident.Screen name="IncidentScreen" component={IncidentScreen} />
          <Incident.Screen name="EditGroupPrompt" component={EditGroupPrompt} />
          <Incident.Screen name="PersonnelPrompt" component={PersonnelPrompt} />
          <Incident.Screen name="AddPersonPrompt" component={AddPersonPrompt} />
        </Incident.Navigator>
      );
    case END_STACK:
      return (
        <End.Navigator screenOptions={screenOptions}>
          <End.Screen name="EndScreen" component={EndScreen} />
          <End.Screen
            name="ExitIncidentPrompt"
            component={ExitIncidentPrompt}
          />
        </End.Navigator>
      );
    case AUTH_STACK:
    default:
      return (
        <Auth.Navigator screenOptions={screenOptions}>
          <Auth.Screen
            name="AuthScreen"
            component={AuthScreen}
            options={{ animationTypeForReplace: 'pop' }}
          />
        </Auth.Navigator>
      );
  }
};

const createStyleSheet = colors =>
  StyleSheet.create({
    // eslint-disable-next-line react-native/no-unused-styles
    container: {
      flex: 1,
      backgroundColor: colors.background.one,
    },
  });

const SwitchNavigator = () => {
  const theme = useSelector(state => selectTheme(state));
  const stack = useSelector(state => selectStack(state));

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const colors = themeSelector(theme);
  const styles = createStyleSheet(colors);

  return (
    <View style={styles.container}>
      <NavigationContainer>{setStack(stack)}</NavigationContainer>
    </View>
  );
};

export default SwitchNavigator;
