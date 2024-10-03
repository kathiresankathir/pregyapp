// Patient DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import CustomDrawer from './(home-out)/component/CustomDrawer';
import PatientSettings from './PatientSettings';
import BottomTabNavigator from './Phome'; // Adjust the import according to your structure

const Drawer = createDrawerNavigator();

const DrawerNavigator2 = () => {
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
        name="home"
        component={BottomTabNavigator}
        options={{
          drawerIcon: ({ color }) => (
            <AntDesign name="home" size={20} color={color} />
          ),
        }}
      />

      
      <Drawer.Screen
        name="Settings"
        component={PatientSettings}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="settings-sharp" size={20} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator2;
