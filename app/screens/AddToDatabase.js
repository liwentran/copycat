import React, { useState, useEffect } from 'react';
import { Text, Button, Image, View, Platform, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import qs from 'qs';
import { Linking } from 'react-native';



export default function AddImageToDatabase(props) {
  const [image, setImage] = useState(null);
  const [displayHelloWorld, setdisplayHelloWorld] = useState("");
  const[content, setContent] = useState("");

  useEffect(() => {
    (async () => {
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
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Select Image To Add To Database</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={{ width: 180, height: 180 }} />}
      <Text style={styles.buttonText}>If this image represents a confirmed case of SCC, please type '1'. If not, please type '0'.</Text>
        <TextInput style={styles.input} value={content} onChangeText={text => setContent(text)}/>
      <TouchableOpacity style={styles.button} 
        onPress = {() => {

            const img = image;
            const cont = content;

            const fullEntry = {
                imageURI: img,
                label: cont
            }

          fetch('https://health-inequity-scc-default-rtdb.firebaseio.com/.json',
          {
            method: 'POST',
            body: JSON.stringify(fullEntry),
            headers: {
                'Content-Type': 'application/json'
            }
          })
        }}>
        <Text style={styles.buttonText}>Add To Database</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={() => {sendEmail(
          'yourdoctor@gmail.com',
          'hello',
          'hello',
          {cc:'otherpeople@gmail.com'}
      ).then(() => {
          console.log('message sent successfully')
      })
      }}>
        <Text style={styles.buttonText}>Send Email</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => {props.navigation.navigate('Home')}}>
        <Text style={styles.buttonText}>Back To Home Screen</Text>
      </TouchableOpacity>
    </View>
  );

}

export async function sendEmail(to, subject, body, options = {}) {
    const { cc, bcc } = options;

    let url = `mailto:${to}`;

    // Create email link query
    const query = qs.stringify({
        subject: subject,
        body: body,
        cc: cc,
        bcc: bcc
    });

    if (query.length) {
        url += `?${query}`;
    }

    // check if we can use this link
    const canOpen = await Linking.canOpenURL(url);

    if (!canOpen) {
        throw new Error('Provided URL can not be handled');
    }

    return Linking.openURL(url);
}

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'white',
    marginBottom: 15,
    padding: 5, 
    margin: 5, 
    color: 'white'
},
label: {
    fontSize: 20,
    marginBottom: 5,
    marginLeft: 20, 
    marginRight: 20,
    color: '#FFFFFF'
}, 
button: {
  backgroundColor: '#404040',
  marginBottom: 20,
  borderRadius: 10,
  padding: 10,
  marginTop: 20,
},
buttonText: {
  color: '#FFFFFF',
  fontSize: 20,
  fontFamily: "Cochin",
  marginLeft: 20, 
  marginRight: 20,
}
});

