// import React from "react";
// import { Text, View } from "react-native";
// import CountDown from "react-native-countdown-component";
// import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'


// const Timer = () => {
//   const onFinishCD = () => {
//     Alert.alert("Countdown Finished...");
//   };

//   const onPressCD = () => {
//     Alert.alert("Countdown Component Pressed...");
//   };

//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center"
//       }}
//     >
//       <Text>Hello, world!</Text>
//       <CountDown
//         until={600}
//         onFinish={onFinishCD}
//         onPress={onPressCD}
//         size={20}
//       />
//     </View>
//   );
// };
// export default Timer;

import * as React from 'react';
import { Text, View, StyleSheet, Button, Image } from 'react-native';
import Constants from 'expo-constants';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

export default function App() {
  const [isPlaying, setIsPlaying] = React.useState(true)
  const [image, setImage] = React.useState('/Users/ataesaggarwal/code/copycat/app/emotion_images/surprise/surprised_person_1.jpeg')

  return (
    <View style={styles.container}>
      <CountdownCircleTimer
        isPlaying={isPlaying}
        duration={60}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[10, 6, 3, 0]}
        onComplete={() => ({ shouldRepeat: false, delay: 2 })}
    >
      {({ remainingTime, color }) => (
        <Text style={{ color, fontSize: 40 }}>
          {remainingTime}
        </Text>
      )}
    </CountdownCircleTimer>
    {image && <Image source={require('/Users/ataesaggarwal/code/copycat/app/emotion_images/surprise/surprised_person_1.jpeg')} style={{ width: 180, height: 180 }} />}
    {/* <Button title="Toggle Playing" onPress={() => setIsPlaying(prev => !prev)} /> */}
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  }
});
