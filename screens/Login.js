import React from 'react';
import {View, Text, Image, StyleSheet, Dimensions, KeyboardAvoidingView, StatusBar, TextInput, TouchableOpacity} from 'react-native';
import { Feather } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import firebase from 'firebase';
import db from '../config'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default function Login({navigation}){

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordIsVisible, setPasswordIsVisible] = React.useState(false);
  
  const handleLogin = () => {
  
      firebase.auth().signInWithEmailAndPassword(email.toString().trim(), password)
      .then((userCredential) => {
       // Signed in
      var user = userCredential.user;
      alert("Welcome back")

      setPassword(null);
      setEmail(null);
      navigation.navigate('Home')
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage)
    });
  }


  return(
    <KeyboardAwareScrollView style={{flex:1}}>
      <StatusBar hidden={false}/>

      <Image source={require('../assets/login.png')} style={styles.image} />

      <View style={styles.textContainer}>
        <Text style={styles.text}>Login Screen</Text>
      </View>

      <View style={{alignItems:'center', marginTop:'2%'}}>
        <Text style={{color:'#CCCCCC', fontSize:15}}>Welcome Back !</Text>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.icon}>
          <Feather name="mail" size={22} color="#7C808D" />
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

      <View style={styles.inputContainer2}>
        <View style={styles.icon}>
          <Feather name="lock" size={22} color="#7C808D" />
        </View>
        <TextInput
              style={styles.input}
              secureTextEntry={!passwordIsVisible}
              placeholder="Password"
              placeholderTextColor="#7C808D"
              selectionColor="#3662AA"
              onChangeText={setPassword}
              value={password}
        />
        <TouchableOpacity style={styles.passwordVisibleButton}
        onPress={() => setPasswordIsVisible(!passwordIsVisible)}>
          <Feather
            name={passwordIsVisible ? "eye" : "eye-off"}
            size={20}
            color="#7C808D"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
      style={styles.forgotPasswordButton}
      onPress={()=>navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotPasswordButtonText}>
          Forgot password?
        </Text>
      </TouchableOpacity>

      <View style={styles.loginButtonContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
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
    width:width,
    height:height/2
  },
  textContainer:{
    justifyContent:'center',
    alignItems:'center',
    paddingTop:'5%'
  },
  text:{
    fontSize:30,
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
  inputContainer2: {
    flexDirection: "row",
    width: "86%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    position: "relative",
    marginLeft:30,
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
  forgotPasswordButton: {
    alignSelf: "flex-end",
    marginRight:30
  },
  forgotPasswordButtonText: {
    color: "#6C63FF",
    fontSize: 14,
    fontWeight: "500",
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
  passwordVisibleButton: {
    position: "absolute",
    right: 0,
  },
  registerScreenButtonContainer:{
    alignItems:'center',
    marginTop:'3%'
  },
  registerScreenButtonText:{
    color:"#ccc"
  }
})