import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  ImageBackground,
  Dimensions,
  Text,
  FlatList,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  Modal,
  TextInput
} from 'react-native';

import COLORS from '../assets/colors';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons, AntDesign, MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';
import { RFValue } from "react-native-responsive-fontsize";
import firebase from 'firebase';
import db from '../config';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CalendarStrip from 'react-native-calendar-strip';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function Home({ navigation }) {
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [tasks,setTasks]= useState([]);
  const[image,setImage]= useState('https://dummyimage.com/80x80/000/fff.png');
  const [name,setName]= useState('')
  
  const [taskInput, setTaskInput] = useState('')
  const [modalVisible,setmodalVisible]=useState(false);
  const [task, setTask] = useState('');
  const [minDate, setMinDate] = useState('');

  useEffect(() => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    const datee = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = days[datee.getDay()];
    setCurrentDateTime( currentDay + " "+ date + '-' + month + '-' + year);//format: d-m-y;
  }, []);

  useEffect(()=>{
    getUserDetails();
    fetchImage();
     getTasks();

     var d = new Date();
     setMinDate(d.toDateString())
  },[])

    const setModalVisible=(visible)=> {
    setmodalVisible(visible);
  }

    const getUserDetails = () => {
      try{
        db.collection("users")
          .where("email", "==", firebase.auth().currentUser.email)
          .onSnapshot((snapshot) => {
            snapshot.docs.map((doc) => {
              setName(doc.data().name)
            })
        })
      }
      catch(error){
        alert(error.message)
      }
    }



  const emptylist=()=>{
    return(
      <View style={{alignSelf:'center',justifyContent:'center',alignItems:'center',}}>
        <Text style={{fontSize:15,fontWeight:'bold',textAlign:'center'}} > No tasks at the moment</Text>
      </View>
    ) 
  }

  const logout=()=>{
    firebase.auth().signOut().then(() => {
      Alert.alert('You are successfully logged out.')
      navigation.navigate('Splash')
    }).catch((error) => {
      Alert.alert('Something went wrong. Could you please try again later.')
    });
  }

// Submit Button for add schedule in modal
    const submitButton=()=> {
        if (task) {
             db.collection(firebase.auth().currentUser.email).add({
              //  date: date,
              //  time: time,
                task: task,
              //  min:min,
                dateC:minDate,
            });
            alert('Task Added');
            setTask(null);
            setmodalVisible(false)
          //  setTime(null);
           // setMin(null);
        } else {
            alert('Please fill in all the fields including selecting a date');
        }
    };

  const getTasks = async() => {
    db.collection(firebase.auth().currentUser.email).orderBy('dateC').onSnapshot((snapshot) => {
    var allT = [];
    snapshot.docs.map((doc) => {
    var task = doc.data();
      task.id=doc.id;
      allT.push(task);
    })
    setTasks(allT);
 
 
});
}

const handleTick = (postId) => {
  Alert.alert(
    'Completed Your Task?',
    'Well Done!',
    [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed!'),
        style: 'cancel',
      },
      {
        text: 'Confirm',
        onPress: () => deleteTask(postId),
      },
    ],
    {cancelable: false},
  );
};

const handleDelete = (postId) => {
  Alert.alert(
    'Delete post',
    'Are you sure?',
    [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed!'),
        style: 'cancel',
      },
      {
        text: 'Confirm',
        onPress: () => deleteTask(postId),
      },
    ],
    {cancelable: false},
  );
};

const deleteTask= async(id)=>{
 await db.collection(firebase.auth().currentUser.email).doc(id).delete().then(() => {
}).catch((error) => {
    alert("Something went wrong!Try later");
});
getTasks();
}

const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log('Result', result.assets[0].uri);

    if (!result.cancelled) {
      setImage(result.assets[0].uri ); 
      uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (imageUri) => {
    try {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', imageUri, true);
        xhr.send(null);
      });

      await firebase
        .storage()
        .ref()
        .child('usersP/' + firebase.auth().currentUser.email)
        .put(blob);

      fetchImage();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchImage = async () => {
    try {
      const url = await firebase
        .storage()
        .ref()
        .child('usersP/' + firebase.auth().currentUser.email)
        .getDownloadURL();
       setImage( url) ;
    } catch (e) {
      console.log(e);
    }
  };


//Modal
  

  const renderItem = ({item}) => {
    return(
      <View style={{backgroundColor:'#E5E5E5',width:'90%',marginLeft:30,marginRight:13,borderRadius:20,flex:1,margin:10}}>
     
          <ScrollView>

          <Text style = {{
              alignSelf : "center",
              fontSize : RFValue(20),
              color:'black',
              marginTop:20
          }}>{item.task}</Text>
            <View style={{flexDirection:'row'}}>
              <Pressable style={{alignSelf:'flex-start',marginRight:10,margin:5}} onPress={()=>handleTick(item.id)}>
                <MaterialIcons name="done" size={24} color="green" />
              </Pressable>
              <Pressable style={{alignSelf:'flex-end',marginRight:0,margin:5}} onPress={()=>handleDelete(item.id)}>
                <AntDesign name="delete" size={22} color="red" />
              </Pressable>
            </View>
          </ScrollView>
    
      </View>
    )
  } 

  return (
    <View style={{ flex: 1 ,backgroundColor:'#6C63FF'}}>
    <SafeAreaView style = {styles.droidSafeArea} />
    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
      <Text style={{marginTop:20,marginLeft:20,fontSize:20, color:'white'}}>Hi {name} !!</Text>

      <TouchableOpacity style={{justifyContent:'center',alignItems:'center',marginRight:10, backgroundColor:'white', width:70, borderRadius:20, borderColor:'black',marginTop:20, borderWidth:2}}
      onPress={logout}>
        <Text style={{textAlign:'center'}}>logout</Text>
      </TouchableOpacity>
    </View>
      <Text
        style={{
          fontSize: 20,
          alignSelf: 'flex-start',
         // marginTop: 20,
          marginLeft: 20,
          fontWeight:'bold',
          color:'white'
        }}>
        Today
      </Text>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text
          style={{
            fontSize: 15,
            alignSelf: 'flex-start',
            marginLeft: 20,
            color:'white'
          }}>
          {currentDateTime}
        </Text>
        <TouchableOpacity onPress={pickImage} style={{ alignItems: 'center' }}>
          <Image
          source={{ uri: image }}
          style={{ width:50, height:50, alignSelf:'center', borderRadius:80, borderWidth:2,borderColor:'white'}}/>
        </TouchableOpacity>   
      </View>

      <View style={{backgroundColor:'white', flex:1, marginTop:'4%', borderTopLeftRadius:40}}>
      <CalendarStrip
        style={{
          height: '15%',
          fontSize: 40,
          borderBottomWidth:1,
          borderBottomColor:'grey'
        }}
        calendarHeaderStyle={{
          color: '#000',
          fontSize: 18,
          marginTop: 20,
        }}
        dateNumberStyle={{ color: 'black' }}
        dateNameStyle={{ color: 'black' }}
        highlightDateNumberStyle={{ color: '#6C63FF' }}
        highlightDateNameStyle={{ color: '#6C63FF' }}
        selectedDate={moment()}
        scrollable={true}
        iconContainer={{ flex: 0.1 }}
      />

      <Text style={{marginLeft:20, marginTop:20, fontSize:20, fontWeight:'bold', color:'#000'}}>My Tasks</Text>

      <FlatList 
        ListEmptyComponent={emptylist}
        scrollEnabled = {true}
        data = {tasks}
        renderItem={renderItem}
        keyExtractor={(item, index)=>index.toString()}
        style={{
        marginBottom:20,
        marginTop:30,
        borderTopLeftRadius:20,
      }} />

      <View style={{alignSelf:'center', justifyContent:'center', alignItems:'center'}}>      
        <TouchableOpacity
          onPress={()=>setModalVisible(true)}
          style={styles.fab}>
          <AntDesign name="plus" size={32} color="white" />
        </TouchableOpacity>
      </View>
     
      </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setmodalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Add Task</Text>
              <View style={{borderRadius:15,paddingLeft:'2%',paddingRight:'3%',height:200}}>
              <TextInput
                style={{
                    alignSelf:'center',
                    padding:10,
                    height:50,
                    width:200,
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
              </View>
              
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      
    </View>
  );
}

const styles=StyleSheet.create({
  fab: {
   // position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
   // marginTop:RFValue(100),
    backgroundColor: '#6C63FF',
    borderRadius: 30,
    elevation: 8,
    marginBottom:30
  },
  droidSafeArea: {
    marginTop: Platform.OS == "android" ? StatusBar.setHidden(true) : RFValue(0)
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
    modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight:'bold',
    fontSize:15
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  buttonClose: {
    backgroundColor: "#2196F3", 
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop:'3%'
  },

})