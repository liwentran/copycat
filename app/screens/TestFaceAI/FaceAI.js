// import React from "react";
// import { Text, View } from "react-native";

// const FaceAI = () => {

// const video = document.getElementById('video')

// Promise.all([ƒ
//   faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
//   faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
//   faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
//   faceapi.nets.faceExpressionNet.loadFromUri('/models')
// ]).then(startVideo)

// function startVideo() {
//   navigator.getUserMedia(
//     { video: {} },
//     stream => video.srcObject = stream,
//     err => console.error(err)
//   )
// }

// video.addEventListener('play', () => {
//   const canvas = faceapi.createCanvasFromMedia(video)
//   document.body.append(canvas)
//   const displaySize = { width: video.width, height: video.height }
//   faceapi.matchDimensions(canvas, displaySize)
//   setInterval(async () => {
//     const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
//     const resizedDetections = faceapi.resizeResults(detections, displaySize)
//     canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
//     faceapi.draw.drawDetections(canvas, resizedDetections)
//     faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
//     faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
//   }, 100)
// })

//   return(
//     <View>
//       <Text>hi</Text>
//     </View>
//   )

// }

// export default FaceAI;

import React from "react";
import { Text, View } from "react-native";
import * as faceapi from "face-api.js";

const input =  "/Users/ataesaggarwal/code/copycat/app/emotion_images/angry1.jpeg"

const detection = async () =>
{
  return(await faceapi
    .detectSingleFace(
      "/Users/ataesaggarwal/code/copycat/app/emotion_images/angry1.jpeg"
    )
    .withFaceExpressions());
} 

// // const detectionWithExpressions =  await faceapi.detectSingleFace(input).withFaceExpressions()


// const test = detection()
// console.log(test)
// const detections = await faceapi.detectAllFaces("/Users/ataesaggarwal/code/copycat/app/emotion_images/angry1.jpeg");
// console.log(detections)

const d = detection()
const a = Object.entries(d).map( ([key, value]) => `My key is ${key} and my value is ${value}` )
console.log(d['_1']['0'])
console.log(a)


//   const dimensions = {
//     width: 180,
//     height: 180
// };

// const resizedDimensions = faceapi.resizeResults(d, dimensions);

// console.log(resizedDimensions)
console.log('hey')

const FaceAI = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Text>Hello, world!</Text>
    </View>
  );
};
export default FaceAI;
