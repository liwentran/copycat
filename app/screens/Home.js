import React from "react";
import { ImageBackground, Image, StyleSheet, Text, TouchableOpacity, View, Dimensions } from "react-native";


export default function Home(){
    return(
  <View style={styles.container}>
    <ImageBackground source={require("../assets/home-bg.png")} resizeMode="cover" style={styles.bg}>
        <TouchableOpacity onPress={()=>{alert("you clicked me")}}>
            <Image source={require("../assets/Play.png")} resizeMode="contain" style={styles.image}>
            </Image>
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
    width: 300,
    marginTop: 110
    
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0"
  }
});