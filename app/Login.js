// Login.js
import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  useWindowDimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AuthContext } from './Context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

const loginimg = require('../src/images/loginimg.png');

const Login = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { login } = useContext(AuthContext);
  const { username, password, SetUserName, SetPassword } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const { width } = useWindowDimensions();
  const userType = route.params?.userType; // Get user type from params

  const handleLogin = () => {
    login(userType); // Pass userType to login function
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcomeText}>Welcome!</Text>
      <Text style={styles.subText}>Please login to continue</Text>
      <View style={[styles.inputContainer, { width: width * 0.9 }]}>
        <View style={styles.inputGroup}>
          <View style={{ alignItems: 'center' }}>
            <Image source={loginimg} style={styles.image} />
          </View>
          <Text style={styles.label}>Username</Text>
          <TextInput
            placeholder="Enter Username"
            placeholderTextColor="#2f2f2f"
            style={styles.input}
            value={username}
            onChangeText={SetUserName}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              secureTextEntry={!showPassword}
              placeholder="Enter Password"
              placeholderTextColor="#2f2f2f"
              style={styles.input}
              value={password}
              onChangeText={SetPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? 'eye' : 'eye-off'}
                size={18}
                color="#2f2f2f"
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  welcomeText: {
    color: '#2f2f2f',
    fontWeight: 'bold',
    fontSize: 29,
    textAlign: 'center',
    marginBottom: 10,
  },
  subText: {
    color: '#2f2f2f',
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    backgroundColor: '#d9d9d9',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  inputGroup: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    color: '#2f2f2f',
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 5,
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingLeft: 20,
  },
  passwordContainer: {
    position: 'relative',
    width: '100%',
  },
  eyeIcon: {
    position: 'absolute',
    top: 15,
    right: 20,
  },
  loginButton: {
    height: 50,
    borderRadius: 50,
    backgroundColor: '#119988',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});