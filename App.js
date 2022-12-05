import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView,ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Currentlocation from "./src/Currentlocation";

import MQTT from 'react-native-mqtt-new';

export default function App() {

  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  const [ipaddress, setipaddress] = useState('')
  const [phone, setphone] = useState('')
  const [flag, setflag] = useState(0)
  const [lati, setlati] = useState(12.957400);
  const [longi, setlongi] = useState(80.262444);
  const login1 = () => {

    if (username == "Lora" && password == "lora" ) {

     
      AsyncStorage.setItem('ipaddress', ipaddress);

      
      MQTT.createClient({
        uri: 'mqtt://broker.hivemq.com:1883',
        clientId: 'your_client_id'
      }).then(function (client) {
        client.on('closed', function () {
          console.log('mqtt.event.closed');
        });
        client.on('error', function (msg) {
          console.log('mqtt.event.error', msg);

        });

        client.on('message', function (msg) {
      
          var location = msg.data.split(',');

          locationlat=Number(location[0])
          locationlong=Number(location[1])


          setlati(locationlat)
          setlongi(locationlong)


          console.log (msg)

        });

        client.on('connect', function () {
          console.log('connerrrrrrrrcted');
          client.subscribe('lora_stjoseph/location', 0);
          setflag(1)


        });

        client.connect();


      }).catch(function (err) {
        console.log(err);
      });
      // console.log (usernameentered)
      // console.log (passwordentered)

    
    
     


    }
    else {
      alert("Please enter the correct values")
    }
  }


  if (flag == 0) {
    return (
      <ImageBackground source={require('./push1.jpg')} style={styles.image}>
      <View style={styles.container}>
        <Text style={styles.logo}>LORA TRACKING</Text>
        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder="Username"
            placeholderTextColor="#003f5c"
            onChangeText={text => setusername(text)} />
        </View>



    
        <View style={styles.inputView} >
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            onChangeText={text => setpassword(text)} />
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={login1} >
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
      </ImageBackground>
    );
  }
  else if (flag == 1) {
    return (
      <Currentlocation lati={lati} longi ={longi} />
    );
  }



}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: "bold",
    fontSize: 35,
    color: "#0eebbe",
    marginBottom: 40
  },
  inputView: {
    width: "80%",
    backgroundColor: "#0eebbe",
    borderRadius: 15,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    height: 50,
    color: "white",
    fontSize: 17
  },
  forgot: {
    color: "white",
    fontSize: 11
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#0eebbe",
    borderRadius: 15,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
  loginText: {
    color: "white",
    fontWeight: 'bold',
    fontSize: 17
  },
  image: {
    flex: 1,
    resizeMode: "center",
    justifyContent: "center"
  },
});



