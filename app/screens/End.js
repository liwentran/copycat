import React, { useEffect } from "react";
import { ImageBackground, Image, StyleSheet, TouchableOpacity, View, Dimensions, Text } from "react-native";
import axios from "axios";


export default function End(props){

  useEffect(() => {
    fetch('https://145r4m1ida.execute-api.us-east-1.amazonaws.com/v1/get-emotions').then(response => {
        return response.json();
    }).then((data) => {
      const loadedItems = [];
      console.log(typeof data.body);
      for(const filename in data.body){
        console.log(data.body[filename])
    }
});
}, []);
  
  /** 
  useEffect(() => {
    fetch('https://injourna-12068-default-rtdb.firebaseio.com/.json').then(response => {
        return response.json();
    }).then((data) => {
        const loadedItems = [];

        for(const key in data){
            const item = {
            id: key, 
            ...data[key]
        };

        for(let i = 0; i < item.emotion.length; i++){
          if(item.emotion.charAt(i) == '[' && item.emotion.charAt(i+1) == '[')
          {
            emotion = item.emotion.substring(i+2, i+5);
            loadedItems.push(emotion);
          }
        }
  }
  setEntries(loadedItems);
  // console.log(loadedItems.length);

  let sum = 0.0;

  for(let l = 0; l < loadedItems.length; l++)
  { 
    let a = parseFloat(loadedItems[l]); 
    sum = sum + a;
  }
  // console.log(sum);
  // console.log(loadedItems.length);
  average = sum/(loadedItems.length);
});
}, []);
*/


  let correctArr = [
    0, //happy
    0, //sad
    0, //surprise
    0, //angry
    0, //fear
    0, //disgust
    0, //neutral
  ]

  let totalArr = [
    0, //happy
    0, //sad
    0, //surprise
    0, //angry
    0, //fear
    0, //disgust
    0, //neutral
  ]


    return(
  <View style={styles.container}>
    <ImageBackground source={require("../assets/results_bg.png")} resizeMode="cover" style={styles.bg}>
        <Text style={styles.text}>High Score: 9</Text>
        <Text style={styles.score}>30</Text>
        <View style={styles.emo_scores}>
          <View style={styles.emo}>        
            <Text style={styles.sm_text}>Happy</Text>
            <Text style={styles.sm_text_bold}>{Math.floor((correctArr[0] / totalArr[0]) * 100) || 0}%</Text>
          </View>
          <View style={styles.emo}>        
            <Text style={styles.sm_text}>Sad</Text>
            <Text style={styles.sm_text_bold}>{Math.floor((correctArr[1] / totalArr[0]) * 100) || 0}%</Text>
          </View>
          <View style={styles.emo}>        
            <Text style={styles.sm_text}>Anger</Text>
            <Text style={styles.sm_text_bold}>{Math.floor((correctArr[2] / totalArr[0]) * 100) || 0}%</Text>
          </View>
          <View style={styles.emo}>        
            <Text style={styles.sm_text}>Disgust</Text>
            <Text style={styles.sm_text_bold}>{Math.floor((correctArr[3] / totalArr[0]) * 100) || 0}%</Text>
          </View>
          <View style={styles.emo}>        
            <Text style={styles.sm_text}>Surprise</Text>
            <Text style={styles.sm_text_bold}>{Math.floor((correctArr[4] / totalArr[0]) * 100) || 0}%</Text>
          </View>
          <View style={styles.emo}>        
            <Text style={styles.sm_text}>Fear</Text>
            <Text style={styles.sm_text_bold}>{Math.floor((correctArr[5] / totalArr[0]) * 100) || 0}%</Text>
          </View>
          <View style={styles.emo}>        
            <Text style={styles.sm_text}>Neutral</Text>
            <Text style={styles.sm_text_bold}>{Math.floor((correctArr[6] / totalArr[0]) * 100) || 0}%</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => {props.navigation.navigate('Home')}}>
            <Image source={require("../assets/play_again.png")} resizeMode="contain" style={styles.image}></Image>
        </TouchableOpacity>
    </ImageBackground>
  </View>
)}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
},
  bg: {
    width: '100%',
    height: '100%',
    alignItems: "center",
    justifyContent: "center",
  },
  image:{
    justifyContent: "center",
    top:70,
  },
  text: {
    marginTop: 150,
    color: "black",
    fontSize: 30,
    fontWeight: "regular",
    textAlign: "center",
  },
  sm_text: {
    color: "black",
    fontSize: 20,
    fontWeight: "regular",
    textAlign: "center",
  },
  sm_text_bold: {
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  score: {
    marginLeft: 20,
    fontSize: 80,
    fontWeight: "bold",
  },
  emo_scores: {
    display: "flex",
    width: '80%',
    justifyContent: "space-evenly",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  emo: {
    textAlign: 'center',
    paddingHorizontal: 15,
    marginVertical: 11
  }
});