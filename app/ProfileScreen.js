import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_SERVER_URL } from './Context/config';

const ProfileScreen = ({ route, navigation }) => {
  const { doctorid, user, password, name } = route.params || {};

  const [username, setUsername] = useState(user || '');
  const [prfname, setPrfname] = useState(name || '');
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState(password || '');

  useEffect(() => {
    if (doctorid === undefined || user === undefined || password === undefined) {
      Alert.alert('Error', 'Required data is missing');
    }
  }, [doctorid, user, password]);

  const handleUpdateProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('authtoken');
      const response = await axios.put(`${API_SERVER_URL}/updateProfile`, {
        doctorid: doctorid,
        username: username,
        name: prfname,
        password: newPassword || currentPassword,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Profile updated successfully');
        
        // Delay navigation to Settings page
        setTimeout(() => {
          navigation.navigate('SettingsHome'); // Adjust the screen name as needed
        }, 2000); // Delay of 2 seconds
      }
    } catch (error) {
      console.log('Error:', error);
      Alert.alert('Failed to update profile');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileSection}>
        <View style={styles.circle}>
          <Text style={{ color: '#119988', fontSize: 32, fontWeight: 'bold' }}>
            {name && name[0]}
          </Text>
        </View>
        <Text style={styles.label}>Doctor ID: {doctorid}</Text>
      </View>
      
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={prfname}
        onChangeText={setPrfname}
      />

      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        value={username}
        editable={false}
      />

      <Text style={styles.label}>Current Password</Text>
      <TextInput
        style={styles.input}
        value={currentPassword}
        editable={false}
        secureTextEntry={true}
      />
      
      <TouchableOpacity style={styles.loginbtn} onPress={handleUpdateProfile}>
        <Text style={styles.start}>Update Profile</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  loginbtn: {
    width: '100%',
    paddingLeft: '30%',
    paddingRight: '30%',
    height: 50,
    borderRadius: 15,
    backgroundColor: '#119988',
    alignItems: 'center',
    justifyContent: 'center',
  },
  start: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  circle: {
    width: 60,
    height: 60,
    backgroundColor: '#e2e2e2',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
  },
});
