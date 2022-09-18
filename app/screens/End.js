import React, { useEffect, useState } from "react";
import { ImageBackground, Image, StyleSheet, TouchableOpacity, View, Dimensions, Text } from "react-native";


export default function End(props, correctAnswers) {


  const [userAnswers, setUserAnswers] = useState({});

  useEffect(() => {
    fetch('https://145r4m1ida.execute-api.us-east-1.amazonaws.com/v1/get-emotions').then(response => {
      return response.json();
    }).then((data) => {
      setUserAnswers(data.body);
    });
  }, []);
  

  // Dictionary of correct answers (filename : emotion)
  let answers = {"img1.jpg": "happy", "img2.jpg": "sad", "img3.jpg": "happy",  "img4.jpg": "surprise",  "img5.jpg": "happy",  "img6.jpg": "fear",  "img7.jpg" : "disgust",
  "img8.jpg": "anger", "img9.jpg": "sad", "img10.jpg": "anger",  "img11.jpg": "anger",  "img12.jpg": "happy",  "img13.jpg": "fear",  "img14.jpg" : "disgust",
  "img15.jpg": "happy", "img16.jpg": "neutral", "img17.jpg": "happy",  "img18.jpg": "surprise",  "img19.jpg": "neutral",  "img20.jpg": "fear",  "img21.jpg" : "disgust",
  }

  correctAnswers = {"img1.jpg": "happy", "img2.jpg": "happy", "img3.jpg": "happy",  "img4.jpg": "surprise",  "img5.jpg": "happy",  "img6.jpg": "happy",  "img7.jpg" : "disgust",
  "img8.jpg": "surprise", "img9.jpg": "sad", "img10.jpg": "happy",  "img11.jpg": "anger",  "img12.jpg": "happy",  "img13.jpg": "fear",  "img14.jpg" : "disgust",
  "img15.jpg": "disgust", "img16.jpg": "anger", "img17.jpg": "sad",  "img18.jpg": "neutral",  "img19.jpg": "neutral",  "img20.jpg": "fear",  "img21.jpg" : "disgust",
  }

  let correct = {"happy": 0, "sad": 0, "anger": 0, "disgust": 0, "surprise": 0, "fear": 0, "neutral": 0};
  let total = {"happy": 0, "sad": 0, "anger": 0, "disgust": 0, "surprise": 0, "fear": 0, "neutral": 0};

  let score = 0;
  for (let filename in answers) {
    if (correctAnswers[filename] == answers[filename]){
      correct[correctAnswers[filename]]++;
      score++;
    }
    total[correctAnswers[filename]]++;
  }




  return (
    <View style={styles.container}>
      <ImageBackground source={require("../assets/results_bg.png")} resizeMode="cover" style={styles.bg}>
        <Text style={styles.text}>High Score: 43</Text>
        <Text style={styles.score}>{score}</Text>
        <View style={styles.emo_scores}>
          <View style={styles.emo}>
            <Text style={styles.sm_text}>Happy</Text>
            <Text style={styles.sm_text_bold}>{Math.floor((correct['happy'] / total['happy']) * 100) || 0}%</Text>
          </View>
          <View style={styles.emo}>
            <Text style={styles.sm_text}>Sad</Text>
            <Text style={styles.sm_text_bold}>{Math.floor((correct['sad'] / total['sad']) * 100) || 0}%</Text>
          </View>
          <View style={styles.emo}>
            <Text style={styles.sm_text}>Anger</Text>
            <Text style={styles.sm_text_bold}>{Math.floor((correct['anger'] / total['anger']) * 100) || 0}%</Text>
          </View>
          <View style={styles.emo}>
            <Text style={styles.sm_text}>Disgust</Text>
            <Text style={styles.sm_text_bold}>{Math.floor((correct['disgust'] / total['disgust']) * 100) || 0}%</Text>
          </View>
          <View style={styles.emo}>
            <Text style={styles.sm_text}>Surprise</Text>
            <Text style={styles.sm_text_bold}>{Math.floor((correct['surprise'] / total['surprise']) * 100) || 0}%</Text>
          </View>
          <View style={styles.emo}>
            <Text style={styles.sm_text}>Fear</Text>
            <Text style={styles.sm_text_bold}>{Math.floor((correct['fear'] / total['fear']) * 100) || 0}%</Text>
          </View>
          <View style={styles.emo}>
            <Text style={styles.sm_text}>Neutral</Text>
            <Text style={styles.sm_text_bold}>{Math.floor((correct['neutral'] / total['neutral']) * 100) || 0}%</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => { props.navigation.navigate('Home') }}>
          <Image source={require("../assets/play_again.png")} resizeMode="contain" style={styles.image}></Image>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  )
}

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
  image: {
    justifyContent: "center",
    top: 70,
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