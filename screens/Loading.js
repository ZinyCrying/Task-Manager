import React, { useEffect } from 'react';
import {
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,Platform,StatusBar
} from 'react-native';
import firebase from 'firebase';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'

import db from '../config';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
export default function Loading({ navigation }) {
  function UserLogedIn() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate('Home');
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/v8/firebase.User
        var uid = user.uid;
        // ...
      } else {
        navigation.navigate('SwiperComponent');

        // User is signed out
        // ...
      }
    });
  }
  useEffect(() => {
    UserLogedIn();
  });
  return  ( <View style={styles.container}>
      <SafeAreaView style = {styles.droidSafeArea} />
        <Text
          style={{
            marginTop: 150,
            alignSelf: 'center',
            fontSize: 25,
            color: 'black',
            fontWeight: 'bold',
          }}>
          Loading ... Please wait.
        </Text>
      </View>)
      
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
   droidSafeArea: {
     
    marginTop: Platform.OS == "android" ? StatusBar.setHidden(true) : RFValue(0)

},
});
