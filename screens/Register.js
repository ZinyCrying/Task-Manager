import React from 'react'

import
{ StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions, 
  KeyboardAvoidingView, 
  TextInput, 
  Image,
  StatusBar } from 'react-native'

import { Feather } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';

import firebase from 'firebase';
import db from '../config'

const height  = Dimensions.get('window').height;
const width  = Dimensions.get('window').width;

export default function Register({navigation}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name,setName]=React.useState('');
  const [passwordIsVisible, setPasswordIsVisible] = React.useState(false)

  const handleRegister = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email.toString().trim(), password)
      .then((userCredential) => {
        var user = userCredential.user;
        console.log(user);
       db.collection("users").add({
          password : password,
          email : email,
          name : name
          })
        alert('Successfully Registered');
        
        setPassword(null);
        setEmail(null);
        navigation.navigate('Home')
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert(errorMessage);
      });
  }

  return (
    <KeyboardAvoidingView style={{flex:1}}>
      <StatusBar hidden={false}/>

      <Image source={require('../assets/register.png')} style={styles.image} />

      <View style={styles.textContainer}>
        <Text style={styles.text}>Register</Text>
      </View>

      <View style={{alignItems:'center', marginTop:'2%'}}>
        <Text style={{color:'#CCCCCC', fontSize:15}}>Create a Account</Text>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.icon}>
          <Ionicons name="md-person-outline" size={22} color="black" />
        </View>
        <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="#7C808D"
              selectionColor="#3662AA"
              onChangeText={setName}
              value={name}
        />
      </View>

      <View style={styles.inputContainer2}>
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

      <View style={styles.loginButtonContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
          <Text style={styles.loginButtonText}>Register</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.registerScreenButtonContainer}>
        <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
          <Text style={styles.registerScreenButtonText}>
            Already a User? Login
          </Text>
        </TouchableOpacity>
      </View>

    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  image:{
    width:width,
    height:height/2.5
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