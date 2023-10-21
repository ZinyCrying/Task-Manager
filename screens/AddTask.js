import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Pressable,
    Alert,
    StatusBar,
    Arrow,
    Platform,
    SafeAreaView,ScrollView,Dimensions,
} from 'react-native';
import db from '../config';
import { RFValue } from 'react-native-responsive-fontsize';
import { Calendar } from 'react-native-calendars';
import firebase from 'firebase';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function AddTask({navigation}) {


   
    
  
    const [task, setTask] = useState('');
    const [date, setDate] = useState('');
    const [minDate, setMinDate] = useState('');
    const [time, setTime] = useState('')
    const [min, setMin] = useState('')
    
    
    
        
      

    useEffect(() => {
        var d = new Date();
       // console.log(d.toDateString())
        setMinDate(d.toDateString())
    }, []);

    const submitButton=()=> {
        if (date && task) {
             db.collection(firebase.auth().currentUser.email).add({
                date: date,
              //  time: time,
                task: task,
              //  min:min,
                dateC:minDate,
            });
            alert('Task Added');
            setTask(null);
          //  setTime(null);
           // setMin(null);
        } else {
            alert('Please fill in all the fields including selecting a date');
        }
    };

    return (

        <ScrollView style={{flex:1,height:screenHeight,width:screenWidth}}>

             <SafeAreaView style = {styles.droidSafeArea }/>

            <View style={styles.header}>
              <Pressable onPress={()=>navigation.navigate('Home')}>
              <AntDesign name="leftcircleo" size={35} color="#56575C"/></Pressable>
              <Text style={{alignSelf:'center',fontSize:25,color:'#000', fontWeight:'bold', marginLeft:60}}> Add Schedule </Text>
            </View>

            <Calendar
                onDayPress={(day) => {
                    console.log("Calender date" + day.timestamp)
                    setDate(day.dateString);
                    alert("Date Selected");
                    // setTriggerDay(day.day)
                    // setTriggerMonth(day.month)

                }}
                theme={{

                }}

             minDate = {minDate}
            />

             <TextInput
                style={{
                    alignSelf:'center',
                    padding:10,
                    height:50,
                    width:300,
                    marginTop: 40,
                    borderWidth: 2,
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                    borderBottomLeftRadius: 8,
                    borderBottomRightRadius: 8,
                    
                    // fontFamily : "Comic-Neue"
                }}
                placeholder={'Task Description'}
                onChangeText={(text) => {
                    setTask(text);
                }}
                value={task}
            />

            <Pressable
                style={styles.buttonStyle}
                onPress={submitButton}>
                <Text style={{color:'white',fontSize:25}}> Add Schedule </Text>
            </Pressable>
        </ScrollView>
    );

}


const styles = StyleSheet.create({
    header: {
       // backgroundColor: 'pink',
        flexDirection:'row',
        height: RFValue(60),
        marginTop:5,
        marginRight:20,
        marginLeft:20,
        alignItems: 'center'
    },
    buttonStyle: {
        backgroundColor: '#6C63FF', 
        marginTop: 40,
        width: '80%',
        height: 50,
       // borderWidth: 2,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
  droidSafeArea: {
     
    marginTop: Platform.OS == "android" ? StatusBar.setHidden(true) : RFValue(0)

},
});
