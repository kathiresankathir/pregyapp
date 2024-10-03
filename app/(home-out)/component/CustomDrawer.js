// CustomDrawer.js
import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_SERVER_URL } from '../../Context/config';
import { AuthContext } from '../../Context/AuthContext';

const CustomDrawer = (props) => {
  const [user, setUser] = useState(null);
  const [doctorid, setDoctorID] = useState(null);
  const [name, setName] = useState(null);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('authtoken');
        if (token) {
          const response = await axios.get(`${API_SERVER_URL}/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const userData = response.data;

          if (userData && userData.username && userData.doctorid ) {
            setDoctorID(userData.doctorid);
            setName(userData.name);

            setUser(userData.username);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: 'rgba(103, 198, 186, 1)' }}>
        <View style={{ padding: 30, paddingTop: 70 }} >

            <View style={styles.profile}>
              <Text style={{ color: '#119988', fontSize: 30, fontWeight: 'bold' }}>
                {name && name[0]}
              </Text>
            </View>
            <Text style={styles.profilename}>
              <Text>{name}</Text>
              <Text> ~ {doctorid}</Text>


            </Text>
            </View>
          <View style={styles.drawmenu}>
            <DrawerItemList {...props} />
          </View>
        </DrawerContentScrollView>
      </View>
      <View>
        <TouchableOpacity style={styles.footer} onPress={logout}>
          <AntDesign name="logout" size={24} color="black" />
          <Text style={styles.signout}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  profile: {
    height: 60,
    width: 60,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilename: {
    color: '#fff',
    fontWeight: 'bold',
    top: 5,
    fontSize: 18,
  },
  drawmenu: {
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  footer: {
    padding: 20,
    paddingBottom: 50,
    borderTopWidth: 0.5,
    borderTopColor: '#119988',
    flexDirection: 'row',
  },
  signout: {
    top: 3,
    paddingLeft: 10,
  },
});

export default CustomDrawer;
