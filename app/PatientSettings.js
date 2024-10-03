import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign, FontAwesome, MaterialIcons,FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useState, useEffect, useLayoutEffect } from 'react';
import socketIOClient from 'socket.io-client';
import axios from 'axios';
import { API_SERVER_URL } from './Context/config';
import { API_SERVER_SOCKET } from './Context/config';

// Import your individual screens
import PatAbout from './PatAbout';
import PatProfile from './PatProfile';
// Create a local stack navigator
const SettingsStack = createStackNavigator();

const SettingsPat = ({ navigation }) => {
  const [doctorID, setDoctorID] = useState(null);
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState(null);
  const [name, setName] = useState(null);



  const socket = socketIOClient(API_SERVER_SOCKET);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('Home2')}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('authtoken');
        if (token) {
          const response = await axios.get(`${API_SERVER_URL}/user`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const userData = response.data;
          setDoctorID(userData.doctorid);
          setUser(userData.username);
          setPassword(userData.password);
          setName(userData.name);
        }
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchUserData();

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <SafeAreaView  style={styles.container}>
      <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Patienthomepage')}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Settings</Text>
      </View>

      <View contentContainerStyle={styles.content}>

         <View style={styles.profileSection}>
        <View style={styles.circle}>
        <Text style={{ color: '#119988', fontSize: 32, fontWeight: 'bold' }}>
         {name && name[0]}
         </Text>
         </View>
          <Text style={styles.infoText}>Name: {name}</Text>
          <Text style={styles.infoText}>Patient ID: {doctorID}</Text>
          <Text style={styles.infoText}>Username: {user}</Text>
          {/* <Text style={styles.infoText}>Password: {password}</Text> */}


        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('PatProfile', {
              doctorid: doctorID,
              user: user,
              password: password,
              name:name,
            })}          >
            <FontAwesome name="user" size={24} color="#119988" />
            <Text style={styles.itemText}>Profile & Password</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('ChangePassword')}
          >
            <MaterialIcons name="lock" size={24} color="#333" />
            <Text style={styles.itemText}>Change Password</Text>
          </TouchableOpacity> */}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('PatAbout')}
          >
           <FontAwesome5 name="info-circle" size={20} color="#119988" />
           <Text style={styles.itemText}>About</Text>
          </TouchableOpacity>
        </View>
        
      </View>
      </View>
    </SafeAreaView>
  );
};

const PatientSettings = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="SettingsPat" component={SettingsPat} options={{ headerShown: false }} />
      <SettingsStack.Screen name="PatProfile" component={PatProfile} options={{ title: 'Profile' }} />
      <SettingsStack.Screen name="PatAbout" component={PatAbout} options={{ title: 'About' ,headerShown: true }} />

    </SettingsStack.Navigator>
  );
};

export default PatientSettings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    marginTop:30,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  content: {
    padding: 20,
  },
  profileSection: {
    padding:10,
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: '600',
  },
  section: {
    marginBottom: 30,
    padding:10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color:"#119988"
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    marginLeft: 10,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 30,
  },
  logoutText: {
    fontSize: 16,
    color: 'red',
    marginLeft: 10,
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
});
