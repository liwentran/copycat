import React, { useState, useEffect } from 'react';
import { Text, Button, Image, View, Platform, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';


export default function ImagePickerExample(props) {
  const [image, setImage] = useState(null);
  const [displayHelloWorld, setdisplayHelloWorld] = useState("");
  const[probability, setProbability] = useState();

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
            setProbability(parseFloat(data.hello).toFixed(3)*100)
          });         
        }}>
        <Text style={styles.buttonText}>Analyze Image</Text>
      </TouchableOpacity>
      <Text style={styles.buttonText}>Emotion: {probability}</Text>
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

