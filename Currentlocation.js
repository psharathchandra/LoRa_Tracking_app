import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,Dimensions ,Image,BackHandler} from 'react-native';
import MQTT from 'react-native-mqtt-new';
import GetLocation from 'react-native-get-location';
import MapView, { Marker } from "react-native-maps";
// import Icon from 'react-native-ionicons'
import Icon from 'react-native-vector-icons/Ionicons';
const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

  export default function App (props) {

    const [lati, setlati] = useState(12.957400);
    const [longi, setlongi] = useState(80.262444);


     useEffect(() => {

      if (lati !== props.lati || longi !== props.longi){

        setlati(props.lati)
        setlongi(props.longi)
        console.log ("iffffffffffffffffffff")

      }

      else {

        console.log ("elseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
      }

 
 
  });

 
 

return(


   
    <View style={{flex:1}}>
    
    <View style={{flex:2}}>
    <MapView
    style={{ flex: 1 }}
    region={{ // initial region set to Bileto
      latitude: lati,
      longitude:longi,
      latitudeDelta: 0.0010,
      longitudeDelta: 0.0010
  }}
    // onRegionChangeComplete={region => setRegion(region)}
  >

    <Marker coordinate={{ latitude:lati,longitude:longi}}
     >
       <Text style={{color:"red",fontSize:20,fontWeight:'bold',textAlign:'center'}}>I am here !!</Text>

<Image source={{uri: 'https://st3.depositphotos.com/4326917/14395/v/1600/depositphotos_143956147-stock-illustration-people-speaking-or-singing-sign.jpg'}}
       style={{width: 40, height: 36}} />
	   
              </Marker>
  </MapView>
    </View>
    </View>
    )
  

  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontWeight:"bold",
    fontSize:35,
    color:"#DA70D6",
    marginBottom:40
  },
  inputView:{
    width:"80%",
    backgroundColor:"#465881",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white"
  },
  forgot:{
    color:"white",
    fontSize:11
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#DA70D6",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"white"
  }
});