import React from "react";
import { ImageBackground, Image, StyleSheet, TouchableOpacity, View, Dimensions, Text } from "react-native";


export default function End(props){
    return(
  <View style={styles.container}>
    <ImageBackground source={require("../assets/results_bg.png")} resizeMode="cover" style={styles.bg}>
        <Text style={styles.text}>High Score: 9</Text>
        <Text style={styles.score}>30</Text>
        <View style={styles.emo_scores}>
          <View style={styles.emo}>        
            <Text style={styles.sm_text}>Happy</Text>
            <Text style={styles.sm_text_bold}>50%</Text>
          </View>
          <View style={styles.emo}>        
            <Text style={styles.sm_text}>Sad</Text>
            <Text style={styles.sm_text_bold}>100%</Text>
          </View>
          <View style={styles.emo}>        
            <Text style={styles.sm_text}>Anger</Text>
            <Text style={styles.sm_text_bold}>75%</Text>
          </View>
          <View style={styles.emo}>        
            <Text style={styles.sm_text}>Disgust</Text>
            <Text style={styles.sm_text_bold}>50%</Text>
          </View>
          <View style={styles.emo}>        
            <Text style={styles.sm_text}>Surprise</Text>
            <Text style={styles.sm_text_bold}>100%</Text>
          </View>
          <View style={styles.emo}>        
            <Text style={styles.sm_text}>Fear</Text>
            <Text style={styles.sm_text_bold}>100%</Text>
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
    top:140,
  },
  text: {
    marginTop: 80,
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
    width: '70%',
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  emo: {
    textAlign: 'center',
    marginHorizontal: 10,
    marginVertical: 10
  }
});