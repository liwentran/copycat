import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Image
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { Camera, CameraType } from "expo-camera";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import Constants from 'expo-constants';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import * as React from 'react';


export default function Game() {
  const [type, setType] = useState(CameraType.front);
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();
  const [isPlaying, setIsPlaying] = React.useState(true)
  // const [image, setImage] = React.useState('./app/emotion_images/sad/sad_person_1.jpeg')
  // const [emotionTarget, setEmotionTarget] =  React.useState('happy')
  random_index = Math.floor(Math.random() * 7)  
  const emotion_vector = ['angry', 'disgust', 'fear', 'happy', 'neutral', 'sad', 'surprise']
  console.log(random_index)
  const string = emotion_vector[0]
  const emotion_target = string
  // emotion_target = emotion_vector[random_index]
  console.log(typeof(emotion_target))
  console.log()
  console.log(typeof(emotion_vector[random_index]))


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

  // '../emotion_images/' + 'happy' + '/' + 1 +'.jpeg'

  return (
    <View>
      <CountdownCircleTimer
        isPlaying={isPlaying}
        duration={60}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[10, 6, 3, 0]}
        onComplete={() => ({ shouldRepeat: false, delay: 2 })}
      >
        {({ remainingTime, color }) => (
          <Text style={{ color, fontSize: 40 }}>{remainingTime}</Text>
        )}
      </CountdownCircleTimer>
      {<Image source={require('../emotion_images/' + 'sad' + '/' + 1 + '.jpeg')} style={{ width: 180, height: 180 }} />}
      <Camera style={styles.container} ref={cameraRef} type={type}>
        <View style={styles.buttonContainer}>
          <Button onPress={changePic} title="Take Pic" onPress={takePic} />
        </View>
        <StatusBar style="auto" />
      </Camera>
    </View>
  );
}

//'../emotion_images/' + 'happy' + '/' + 1 + '.jpeg'
// /Users/ataesaggarwal/code/copycat/app/emotion_images/happy/1.jpeg
// /Users/ataesaggarwal/code/copycat/app/emotion_images/neutral/1.jpeg

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: "50%",
    // marginTop: "110%",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonContainer: {
    backgroundColor: "#fff",
    alignSelf: "flex-end"
  },
  preview: {
    alignSelf: "stretch",
    flex: 1
  }
});
