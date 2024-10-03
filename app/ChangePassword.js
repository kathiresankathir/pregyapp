import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_SERVER_URL } from './Context/config';
import Resetjson from './(home-out)/screens/Resetjson';

const ChangePassword = ({ route, navigation }) => { // Added navigation prop
  const { doctorid, user, password, name } = route.params || {};

  const [username, setUsername] = useState(user || '');
  const [prfname, setPrfname] = useState(name || '');
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState(password || '');

  const newPasswordRef = useRef(null);

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
        Alert.alert('Success', 'Password changed successfully');
        setTimeout(() => {
          navigation.navigate('SettingsHome'); // Navigate to settings page after delay
        }, 2000); // Delay of 2000 milliseconds (2 seconds)
      }
    } catch (error) {
      console.log('Error:', error);
      Alert.alert('Failed to update profile');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Resetjson />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Text style={styles.label}>Current Password</Text>
          <TextInput
            style={styles.input}
            value={currentPassword}
            editable={false}
            secureTextEntry={true}
          />

          <Text style={styles.label}>New Password</Text>
          <TextInput
            ref={newPasswordRef}
            style={styles.input}
            placeholder="Enter new password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={true}
          />

          <TouchableOpacity style={styles.loginbtn} onPress={handleUpdateProfile}>
            <Text style={styles.start}>Reset password</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
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
});
