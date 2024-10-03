import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { API_SERVER_URL } from '../../Context/config'; // Replace with your API server URL

const UploadReport = ({ route, navigation }) => {
  const { doctorID } = route.params; // Get the doctor ID from route params
  const [image, setImage] = useState(null); // State to hold selected image

  // Function to upload image from the gallery
  const handleChooseFromGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All, // Allow all types of images
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const imageUri = result.assets[0].uri; // Get selected image URI
        setImage(imageUri); // Set the image URI to state

        // Determine the file type dynamically
        const fileType = imageUri.split('.').pop();
        const mimeType = `image/${fileType}`; // Set the MIME type based on the file extension

        const formData = new FormData();
        formData.append('Uploads', {
          uri: imageUri,
          type: mimeType, // Use the dynamic MIME type
          name: imageUri.split('/').pop(), // Get the image name
        });
        formData.append('doctorid', doctorID); // Include the doctor ID

        // Send the form data with the image
        const response = await axios.post(`${API_SERVER_URL}/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Image uploaded successfully:', response.data);
        Alert.alert('Success', 'Image uploaded successfully');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Error uploading image: ' + error.message); // Show the error message
    }
  };

  return (
    <View style={styles.box}>
      <View style={styles.boxx}>
        <View style={styles.box2}>
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
            Add a medical record.
          </Text>
          <Text style={styles.text}>
            A detailed health history helps a doctor diagnose you better.
          </Text>
          <TouchableOpacity style={styles.uploadbox} onPress={handleChooseFromGallery}>
            <Text>Upload from Gallery</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.uploadbox2} onPress={() => navigation.navigate('ViewUploadedReport', { doctorID })}>
            <Text>View Uploaded Reports</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default UploadReport;

const styles = StyleSheet.create({
  boxx: {
    alignItems: 'center',
    top: 30,
    rowGap: 50,
  },
  box: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  box2: {
    top: 40,
    alignItems: 'center',
    rowGap: 20,
  },
  text: {
    textAlign: 'center',
    fontSize: 14,
  },
  uploadbox: {
    backgroundColor: '#0EBE7F',
    alignItems: 'center',
    height: 40,
    width: 150,
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  uploadbox2: {
    backgroundColor: '#0EBE7F',
    alignItems: 'center',
    height: 40,
    width: 'auto',
    padding: 10,
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
});
