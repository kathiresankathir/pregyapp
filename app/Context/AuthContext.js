// Context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_SERVER_URL } from './config';
import { Alert } from 'react-native';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [IsLoading, setIsLoading] = useState(true);
  const [usertoken, setusertoken] = useState(null);
  const [username, SetUserName] = useState('');
  const [password, SetPassword] = useState('');
  const [userType, setUserType] = useState(null); // Add userType state

  const isLoggedin = async () => {
    let usertoken = await AsyncStorage.getItem('authtoken');
    let usertype = await AsyncStorage.getItem('usertype'); // Get user type from AsyncStorage
    setusertoken(usertoken);
    setUserType(usertype); // Set user type in context
    setIsLoading(false);
  };

  useEffect(() => {
    isLoggedin();
  }, []);

  const login = async (type) => { // Accept userType as a parameter
    setIsLoading(true);
    const user = {
      username,
      password,
    };

    try {
      const response = await axios.post(`${API_SERVER_URL}/login`, user);
      if (response.data && response.data.token) {
        await AsyncStorage.setItem('authtoken', response.data.token);
        await AsyncStorage.setItem('usertype', type); // Store userType in AsyncStorage
        setusertoken(response.data.token);
        setUserType(type); // Set userType in context
        Alert.alert('Login successful', 'You have logged in successfully');
      } else {
        Alert.alert('Login failed', 'Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.log('Login Failed', error);
      Alert.alert('Login failed', 'An error occurred while logging in.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setIsLoading(true);
    AsyncStorage.removeItem('authtoken');
    AsyncStorage.removeItem('usertype'); // Remove userType from AsyncStorage
    setusertoken(null);
    setUserType(null); // Reset userType in context
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        IsLoading,
        usertoken,
        userType, // Provide userType
        username,
        password,
        SetUserName,
        SetPassword,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
