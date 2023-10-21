import React from 'react';
import {View, Text, Image, StyleSheet, Dimensions, KeyboardAvoidingView, StatusBar, TextInput, TouchableOpacity} from 'react-native';
import { Feather } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import firebase from 'firebase';
import db from '../config'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default function ForgotPassword({navigation}){
  
  const[email,setEmail]= React.useState('')
  
  const forgotPassword=()=>{
    firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
    alert("Email sent! Check your Inbox and also maybe the Spam")
    navigation.navigate('Login');
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage)
      // ..
    });
  }

  return(
    <KeyboardAwareScrollView style={{flex:1}}>
      <StatusBar hidden={false}/>

      <Image source={require('../assets/forgotPassword.png')} style={styles.image} />

      <View style={styles.textContainer}>
        <Text style={styles.text}>Forgot</Text>
        <Text style={styles.text}>Password</Text>
      </View>

      <View style={{alignItems:'flex-start', marginTop:'2%', marginLeft:20}}>
        <Text style={{color:'#CCCCCC', fontSize:15}}>Reset your password</Text>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.icon}>
          <Feather name="mail" size={22} color="#000" />
        </View>
        <TextInput
              style={styles.input}
              placeholder="Email ID"
              placeholderTextColor="#7C808D"
              selectionColor="#3662AA"
              onChangeText={setEmail}
              value={email}
        />
      </View>

      <View style={styles.loginButtonContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={forgotPassword}>
          <Text style={styles.loginButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.registerScreenButtonContainer}>
        <TouchableOpacity onPress={()=>navigation.navigate('Register')}>
          <Text style={styles.registerScreenButtonText}>
            New User? Register
          </Text>
        </TouchableOpacity>
      </View>

    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  image:{
    width:'90%',
    height:height/2,
    alignSelf:'center'
  },
  textContainer:{
    justifyContent:'center',
    alignItems:'flex-start',
    paddingTop:'5%',
    marginLeft:20
  },
  text:{
    fontSize:35,
    fontWeight:'bold'
  },
  inputContainer: {
    flexDirection: "row",
    width: "86%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    position: "relative",
    marginLeft:30,
    marginTop:'10%'
  },

  icon:{
    marginRight: 15,
  },
  input:{
    borderBottomWidth: 1.5,
    flex: 1,
    paddingBottom: 10,
    borderBottomColor: "#eee",
    fontSize: 16,
  },

  loginButtonContainer:{
    justifyContent:'center',
    alignItems:'center'
  },
  loginButton: {
    backgroundColor: "#6C63FF",
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
    width:'80%'
  },
  loginButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  registerScreenButtonContainer:{
    alignItems:'center',
    marginTop:'3%'
  },
  registerScreenButtonText:{
    color:"#ccc"
  }
})