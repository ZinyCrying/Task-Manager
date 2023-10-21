import React from 'react';
import {View} from 'react-native';

import Home from './screens/Home';
import SwiperComponent from './screens/SwiperComonent';
import Register from './screens/Register';
import Login from './screens/Login';
import Loading from './screens/Loading';
import ForgotPassword from './screens/ForgotPassword'

import firebase from 'firebase';
import db from "./config";

import { LogBox, StatusBar } from 'react-native';
import AddTask from './screens/AddTask';

import { createSwitchNavigator, createAppContainer } from 'react-navigation';

LogBox.ignoreLogs(["AsyncStorage has been extracted from react-native core and will be removed in a future release. "]);

const AppSwitchNavigator = createSwitchNavigator({
  
  Loading:Loading,
  SwiperComponent: SwiperComponent,
  Login:Login,
  ForgotPassword : ForgotPassword,
  Register: Register,
  Home:Home,
  AddTask:AddTask,
  
   
}); 

const AppNavigator = createAppContainer(AppSwitchNavigator);

export default function App() {
  return <AppNavigator />;
}
 