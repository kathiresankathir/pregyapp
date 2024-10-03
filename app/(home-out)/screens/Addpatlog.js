import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import axios from 'axios';
import { API_SERVER_URL } from '../../Context/config';
import FlashMessage, { showMessage } from 'react-native-flash-message';

const Addpatlog = ({ route, navigation }) => {
  const { name, doctorid, mobile, userType, username } = route.params; // Extract parameters from route
  const [doctorData, setDoctorData] = useState({
    username,
    password: mobile, // Use mobile as password
    doctorid,
    userType: 'patient',
    name,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true); // Set loading state
      const response = await axios.post(`${API_SERVER_URL}/doctors`, doctorData);

      if (response.status === 201) {
        showMessage({
          message: 'Doctor details saved successfully!',
          type: 'success',
        });

        // Delay navigation to allow flash message to be visible
        setTimeout(() => {
          navigation.navigate("Homepage"); // Adjust the route if needed
        }, 800);
      }
    } catch (error) {
      console.error('Error saving doctor data:', error);
      showMessage({
        message: error.response?.data?.error || 'Error saving doctor details.',
        type: 'danger',
      });
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.whitebox}>
        <View style={styles.header}>
          <Text style={styles.txt}>Patient Details for Login</Text>
        </View>
        <Text style={styles.detail}>Username: {username}</Text>
        <Text style={styles.detail}>Password: {mobile}</Text>
        <Text style={styles.detail}>Doctor ID: {doctorid}</Text>
        <Text style={styles.detail}>User Type: {userType}</Text>
        <Text style={styles.detail}>Name: {name}</Text>

        <TouchableOpacity
          style={styles.activeSaveButton}
          onPress={handleSubmit}
          disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.start}>Save</Text>
          )}
        </TouchableOpacity>
        <FlashMessage position="top" animated={true} icon={'success'} statusBarHeight={10} style={{ backgroundColor: "#119988" }} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  whitebox: {
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 5,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
  },
  txt: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#119988',
  },
  activeSaveButton: {
    width: 250,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#199991',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  start: {
    color: '#fff',
    fontWeight: 'normal',
    fontSize: 18,
  },
  detail: {
    fontSize: 18,
    marginVertical: 10,
  },
});

export default Addpatlog;
