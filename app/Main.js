// DrawerNavigator.js

import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import CustomDrawer from './(home-out)/component/CustomDrawer';
import PatientRecord from './PatientRecord';
import SettingsScreen from './Settings';
import BottomTabNavigator from './Home'; // Adjust the import according to your structure

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#119988',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#119988',
        drawerLabelStyle: {
          marginLeft: -22,
          textTransform: 'capitalize',
          fontSize: 16,
        },
      }}
    >
      <Drawer.Screen
        name="home-n"
        component={BottomTabNavigator}
        options={{
          drawerIcon: ({ color }) => (
            <Entypo name="home" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="PatientRecord"
        component={PatientRecord}
        options={{
          drawerIcon: ({ color }) => (
            <Entypo name="database" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="settings-sharp" size={20} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
