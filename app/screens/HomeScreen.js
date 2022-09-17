// import React from 'react';
// import {
//     View,
//     StyleSheet,
// } from 'react-native';
// import { RNCamera } from 'react-native-camera';
// import { useCamera } from 'react-native-camera-hooks';
// import CustomButton from '/Users/ataesaggarwal/code/copycat/app/CustomButton.js';
// import RNFS from 'react-native-fs';

// export default function Camera() {

//     const [{ cameraRef }, { takePicture }] = useCamera(null);

//     const captureHandle = async () => {
//         try {
//             const data = await takePicture();
//             console.log(data.uri);
//             const filePath = data.uri;
//             const newFilePath = RNFS.ExternalDirectoryPath + '/MyTest.jpg';
//             RNFS.moveFile(filePath, newFilePath)
//                 .then(() => {
//                     console.log('IMAGE MOVED', filePath, '-- to --', newFilePath);
//                 })
//                 .catch(error => {
//                     console.log(error);
//                 })
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     return (
//         <View style={styles.body}>
//             <RNCamera
//                 ref={cameraRef}
//                 type={RNCamera.Constants.Type.back}
//                 style={styles.preview}
//             >
//                 <CustomButton
//                     title="Capture"
//                     color='#1eb900'
//                     onPressFunction={() => captureHandle()}
//                 />
//             </RNCamera>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     body: {
//         flex: 1,
//     },
//     preview: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'flex-end',
//     }
// });

import React, { useState, useEffect } from 'react';
import { Text, Button, Image, View, Platform, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'


export default function ImagePickerExample(props) {
  const [image, setImage] = useState(null);
  const [displayHelloWorld, setdisplayHelloWorld] = useState("");
  const[probability, setProbability] = useState('');
  const [pickedImagePath, setPickedImagePath] = useState('');


  askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    };
  useEffect(() => {
    (async () => {
      askPermissionsAsync();
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      console.log(result.uri);
    }
  }


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const createFormData = (photo, body) => {
    const data = new FormData();
  
    data.append('photo', {
      name: photo.fileName,
      type: photo.type,
      uri:
        Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
    });

    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });
  
    return data;
  };

  const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };


handleUploadPhoto = () => 
{
  fetch('http://127.0.0.1:5000/posting', {
    method: 'POST',
    body: createFormData(this.state.photo, { userId: '123' }),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log('upload succes', response);
      alert('Upload success!');
      this.setState({ photo: null });
    })
    .catch((error) => {
      console.log('upload error', error);
      alert('Upload failed!');
    });
};

var photo = {
  uri: image,
  type: 'image/jpeg',
  name: 'photo.jpg',
}

var form = new FormData();
form.append("image", photo);
  

  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#000000',justifyContent: 'center'}}>
      {/* <Button textStyle = {{color:"#FFFFFF"}} title="Select image to be analyzed" onPress={pickImage}/> */}
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Select Image To Be Analyzed</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={{ width: 180, height: 180 }} />}
      {/* <Text style={styles.label}>Enter Text Here:</Text> */}
        {/* <TextInput style={styles.input} value={content} onChangeText={text => setContent(displayHelloWorld)}/> */}
        <TouchableOpacity style={styles.button} 
        onPress = {() => {
          fetch('http://127.0.0.1:5000/posting',
          {
            body: form, 
            method: 'POST',
          }).then(res => res.json()).then(data => {
            // setProbability(parseFloat(data.hello).toFixed(3)*100)
            setProbability(data.hello)
          });         
        }}>
        <Text style={styles.buttonText}>Analyze Image</Text>
      </TouchableOpacity>
      <Text style={styles.buttonText}>Emotion: {probability}</Text>
      <TouchableOpacity style={styles.button} onPress={openCamera}>
        <Text style={styles.buttonText}>Open Camera</Text>
      </TouchableOpacity>
      
      <View style={styles.imageContainer}>
        {
          pickedImagePath !== '' && <Image
            source={{ uri: pickedImagePath }}
            style={styles.image}
          />
        }
      </View>
    
      {/* <TouchableOpacity style={styles.button} onPress={() => {props.navigation.navigate('Database')}}>
        <Text style={styles.buttonText}>Add Image To Database</Text>
      </TouchableOpacity> */}
    </View>
  );

}

console.disableYellowBox = true;


const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 15,
    padding: 5, 
    margin: 5
},
label: {
    fontSize: 20,
    marginBottom: 5,
    marginLeft: 5
}, 
button: {
  backgroundColor: '#ADD8E6',
  marginBottom: 20,
  borderRadius: 10,
  padding: 10,
  marginTop: 20
},
buttonText: {
  color: '#FFFFFF',
  fontSize: 20,
  fontFamily: "Cochin"
}
});


////////////////////////////////////////////////////

// import React, { Fragment, Component } from 'react';
// import * as ImagePicker from "react-native-image-picker"
// import {launchImageLibrary} from 'react-native-image-picker'

// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
//   StatusBar,
//   Image,
//   Button,
//   Dimensions,
//   TouchableOpacity
// } from 'react-native';

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// const options = {
//   title: 'Select Avatar',
//   customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
//   storageOptions: {
//     skipBackup: true,
//     path: 'images',
//   },
// };
// export default class Camera extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       filepath: {
//         data: '',
//         uri: ''
//       },
//       fileData: '',
//       fileUri: ''
//     }
//   }

//   chooseImage = () => {
//     let options = {
//       title: 'Select Image',
//       customButtons: [
//         { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
//       ],
//       storageOptions: {
//         skipBackup: true,
//         path: 'images',
//       },
//     };
//     ImagePicker.showImagePicker(options, (response) => {
//       console.log('Response = ', response);

//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       } else if (response.customButton) {
//         console.log('User tapped custom button: ', response.customButton);
//         alert(response.customButton);
//       } else {
//         const source = { uri: response.uri };

//         // You can also display the image using data:
//         // const source = { uri: 'data:image/jpeg;base64,' + response.data };
//         // alert(JSON.stringify(response));s
//         console.log('response', JSON.stringify(response));
//         this.setState({
//           filePath: response,
//           fileData: response.data,
//           fileUri: response.uri
//         });
//       }
//     });
//   }

//   launchCamera = () => {
//     let options = {
//       storageOptions: {
//         skipBackup: true,
//         path: 'images',
//       },
//     };
//     ImagePicker.launchCamera(options, (response) => {
//       console.log('Response = ', response);

//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       } else if (response.customButton) {
//         console.log('User tapped custom button: ', response.customButton);
//         alert(response.customButton);
//       } else {
//         const source = { uri: response.uri };
//         console.log('response', JSON.stringify(response));
//         this.setState({
//           filePath: response,
//           fileData: response.data,
//           fileUri: response.uri
//         });
//       }
//     });

//   }

//   launchImageLibrary = () => {
//     let options = {
//       storageOptions: {
//         skipBackup: true,
//         path: 'images',
//       },
//     };
//     ImagePicker.launchImageLibrary(options, (response) => {
//       console.log('Response = ', response);

//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       } else if (response.customButton) {
//         console.log('User tapped custom button: ', response.customButton);
//         alert(response.customButton);
//       } else {
//         const source = { uri: response.uri };
//         console.log('response', JSON.stringify(response));
//         this.setState({
//           filePath: response,
//           fileData: response.data,
//           fileUri: response.uri
//         });
//       }
//     });

//   }

//   // renderFileData() {
//   //   if (this.state.fileData) {
//   //     return <Image source={{ uri: 'data:image/jpeg;base64,' + this.state.fileData }}
//   //       style={styles.images}
//   //     />
//   //   } else {
//   //     return <Image source={require('./assets/dummy.png')}
//   //       style={styles.images}
//   //     />
//   //   }
//   // }

//   // renderFileUri() {
//   //   if (this.state.fileUri) {
//   //     return <Image
//   //       source={{ uri: this.state.fileUri }}
//   //       style={styles.images}
//   //     />
//   //   } else {
//   //     return <Image
//   //       source={require('./assets/galeryImages.jpg')}
//   //       style={styles.images}
//   //     />
//   //   }
//   // }

//   render() {
//     return (
//       <Fragment>
//         <StatusBar barStyle="dark-content" />
//         <SafeAreaView>
//           <View style={styles.body}>
//             <Text style={{textAlign:'center',fontSize:20,paddingBottom:10}} >Pick Images from Camera & Gallery</Text>
//             {/* <View style={styles.ImageSections}>
//               <View>
//                 {this.renderFileData()}
//                 <Text  style={{textAlign:'center'}}>Base 64 String</Text>
//               </View>
//               <View>
//                 {this.renderFileUri()}
//                 <Text style={{textAlign:'center'}}>File Uri</Text>
//               </View>
//             </View> */}

//             <View style={styles.btnParentSection}>
//               <TouchableOpacity onPress={this.chooseImage} style={styles.btnSection}  >
//                 <Text style={styles.btnText}>Choose File</Text>
//               </TouchableOpacity>

//               <TouchableOpacity onPress={this.launchCamera} style={styles.btnSection}  >
//                 <Text style={styles.btnText}>Directly Launch Camera</Text>
//               </TouchableOpacity>

//               <TouchableOpacity onPress={this.launchImageLibrary} style={styles.btnSection}  >
//                 <Text style={styles.btnText}>Directly Launch Image Library</Text>
//               </TouchableOpacity>
//             </View>

//           </View>
//         </SafeAreaView>
//       </Fragment>
//     );
//   }
// };

// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },

//   body: {
//     backgroundColor: Colors.white,
//     justifyContent: 'center',
//     borderColor: 'black',
//     borderWidth: 1,
//     height: Dimensions.get('screen').height - 20,
//     width: Dimensions.get('screen').width
//   },
//   ImageSections: {
//     display: 'flex',
//     flexDirection: 'row',
//     paddingHorizontal: 8,
//     paddingVertical: 8,
//     justifyContent: 'center'
//   },
//   images: {
//     width: 150,
//     height: 150,
//     borderColor: 'black',
//     borderWidth: 1,
//     marginHorizontal: 3
//   },
//   btnParentSection: {
//     alignItems: 'center',
//     marginTop:10
//   },
//   btnSection: {
//     width: 225,
//     height: 50,
//     backgroundColor: '#DCDCDC',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 3,
//     marginBottom:10
//   },
//   btnText: {
//     textAlign: 'center',
//     color: 'gray',
//     fontSize: 14,
//     fontWeight:'bold'
//   }
// });

