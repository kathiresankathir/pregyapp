import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, FlatList, Alert, Modal, TouchableOpacity,RefreshControl } from 'react-native';
import axios from 'axios';
import { API_SERVER_URL } from '../../Context/config'; // Replace with your API server URL

const PatientReports = ({ route }) => {
  const { doctorID } = route.params; // Get the doctor ID from route params
  const [images, setImages] = useState([]); // State to hold the images
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility
  const [selectedImage, setSelectedImage] = useState(null); // Selected image for fullscreen
  const [refreshing, setRefreshing] = useState(false);

  // Function to fetch images from the server
  const fetchImages = async () => {
    setRefreshing(true);
    try {
      const response = await axios.get(`${API_SERVER_URL}/images/${doctorID}`);
      setImages(response.data); // Set the fetched images to state
    } catch (error) {
      if (error.response && error.response.status !== 404) {

      // console.error('Error fetching images:', error);
      Alert.alert('Error', 'Error fetching images: ' + error.message);
      } 
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchImages(); // Fetch images when component mounts
  }, []);

  

  const handleImagePress = (imagePath) => {
    setSelectedImage(imagePath); // Set the selected image
    setModalVisible(true); // Show the modal
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Uploaded Reports</Text>
      {images.length === 0 ? ( // Check if there are no images
        <Text style={styles.noImagesText}>No images found</Text>
      ) : (
        <FlatList
          data={images}
          keyExtractor={(item) => item.image_path}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleImagePress(item.image_path)}>
              <Image
                source={{ uri: `${API_SERVER_URL}/${item.image_path}` }} // Construct image URL
                style={styles.image}
              />
            </TouchableOpacity>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchImages} colors={['#119988']} />
          }
        />
      )}

      {/* Modal for fullscreen image display */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)} // Close modal on request
      >
        <View style={styles.modalContainer}>
          <View style={styles.closeButtonContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
          {selectedImage && (
            <Image
              source={{ uri: `${API_SERVER_URL}/${selectedImage}` }} // Display selected image
              style={styles.fullscreenImage}
            />
          )}
        </View>
      </Modal>
    </View>
  );
};

export default PatientReports;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  fullscreenImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  noImagesText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'gray',
    marginTop: 20,
  },
});
