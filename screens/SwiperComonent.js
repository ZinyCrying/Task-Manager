import React from 'react';


import { View, Text, Image, TouchableOpacity, StyleSheet,Dimensions } from 'react-native';


import Onboarding from 'react-native-onboarding-swiper';


const { height, width } = Dimensions.get("window");
const Dots = ({selected}) => {
    let backgroundColor;


    backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';


    return (
       
        <View
            style={{
                width:6,
                height: 6,
                marginHorizontal: 3,
                backgroundColor
            }}
        />
    );
}


const Skip = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10, }}
        {...props}
    >
        <Text style={{fontSize:16, color:'#D3D3D3'}}>Skip</Text>
    </TouchableOpacity>
);


const Next = ({...props}) => (
    <TouchableOpacity
        style={{
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
        marginHorizontal:10,
        backgroundColor:'#6C63FF',
        width:100,
        height:40,
        borderRadius:20}}
        {...props}
    >
        <Text style={{color:'white', fontSize:16, textAlign:'center'}}>Next</Text>
    </TouchableOpacity>
);


const Done = ({...props}) => (
    <TouchableOpacity
      style={{
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
        marginHorizontal:10,
        backgroundColor:'#6C63FF',
        width:100,
        height:40,
        borderRadius:20}}
        {...props}
    >
        <Text style={{color:'white', fontSize:16, textAlign:'center'}}>Done</Text>
    </TouchableOpacity>
);


const OnboardingScreen = ({navigation}) => {
    return (
       
        <Onboarding

        bottomBarColor="#fff"
        SkipButtonComponent={Skip}
        NextButtonComponent={Next}
        DoneButtonComponent={Done}
        DotComponent={Dots}
        onSkip={() => navigation.navigate("Login")}
        onDone={() => navigation.navigate("Login")}
        pages={[
          {
           
          backgroundColor: 'white',
           image: <Image source={require('../assets/onboarding1.png')} resizeMode='cover'style={{height:300,width:width}}></Image>,
                       title: 'Save your time',
            subtitle: 'People who have fully prepared always save time.',
          },
          {
            backgroundColor: 'white',
            image: <Image source={require('../assets/onboarding2.png')} resizeMode='cover'style={{height:300,width:width}}></Image>,
            title: 'Get Started',
            subtitle: 'Manage Your Tasks, Save your time',
          },
        ]}
      />
    );
};


export default OnboardingScreen;