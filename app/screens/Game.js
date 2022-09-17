import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { Camera, CameraType } from "expo-camera";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import * as React from 'react';


//Images
/** 
import happy1 from '../emotion_images/happy/happy_person_1.jpeg';
import sad1 from '../emotion_images/sad/sad_person_1.jpeg';
import surprise1 from '../emotion_images/surprise/surprised_person_1.jpeg';
import angry1 from '../emotion_images/angry/angry_person_1.jpeg';
import fear1 from '../emotion_images/fear/scared_person_1.jpeg';
import disgust1 from '../emotion_images/disgust/disgusted_person_1.jpeg';
import neutral1 from '../emotion_images/neutral/neutral_person_1.jpeg';
*/

export default function Game() {

  //ImageArray
  const imgArr = [
    require('../emotion_images/happy/1.jpeg'),
    require('../emotion_images/sad/1.jpeg'),
    require('../emotion_images/surprise/1.jpeg'),
    require('../emotion_images/angry/1.jpeg'),
    require('../emotion_images/fear/1.jpeg'),
    require('../emotion_images/disgust/1.jpeg'),
    require('../emotion_images/neutral/1.jpeg'),
  ];

  //CorrespondingAnswersArray: 0 = happy, 1 = sad, 2 = surprised, 3 = confused, 4 = fear, 5 = disgust, 6 = nuetral
  const ansArr = [
    0, 1, 2, 3, 4, 5, 6
  ];

  const [type] = useState(CameraType.front);
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();
  const [isPlaying, setIsPlaying] = React.useState(true)

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  const changePic = () => {
    random_index = Math.floor(Math.random() * 7)
    emotion_target = emotion_vector[random_index]
    console.log(emotion_target)
  }
  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (photo) {
    let sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    return (
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.preview}
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
        />
        <Button title="Share" onPress={sharePic} />
        {hasMediaLibraryPermission ? (
          <Button title="Save" onPress={savePhoto} />
        ) : (
          undefined
        )}
        <Button title="Discard" onPress={() => setPhoto(undefined)} />
      </SafeAreaView>
    );
  }
  return (
    <View style = {styles.view}>
      <CountdownCircleTimer
        isPlaying={isPlaying}
        duration={60}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[10, 6, 3, 0]}
        size={80}
        onComplete={() => ({ shouldRepeat: false, delay: 2 })}
      >
        {({ remainingTime, color }) => (
          <Text style={{ color, fontSize: 30}}>{remainingTime}</Text>
        )}
      </CountdownCircleTimer>
      <Image source={imgArr[Math.floor(Math.random() * imgArr.length)]} style={styles.image} />
      <Camera style={styles.container} ref={cameraRef} type={type}>
        <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={takePic}>
            <Image source={require("../assets/shutter.png")} resizeMode="contain" style={styles.shutter}>
            </Image>
        </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: "60%",
    width:"100%",
    // marginTop: "110%",
    alignItems: "center",
    justifyContent: "center"
  },
  view:{
    justifyContent:"center",
    alignItems:"center",
    marginTop: 60,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  buttonContainer: {
    position: 'absolute',
    bottom:120,
  },
  preview: {
    alignSelf: "stretch",
    flex: 1
  },
  image: {
    width: "100%",
    height: "30%",
    marginTop: 20,
  },
  shutter: {
    width: 80,
    height: 80,
  }
});
