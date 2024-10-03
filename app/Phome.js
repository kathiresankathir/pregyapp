import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import CustomDrawer from './(home-out)/component/CustomDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Patienthomepage from './(home-out)/screens/Patienthomepage';
import PatientSettings from './PatientSettings';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // Hide the header for bottom tabs
        tabBarStyle: { backgroundColor: '#ffffff',position: 'absolute' }, // Customize the tab bar style
        tabBarLabelStyle: {  } ,// Customize the tab label style
        tabBarActiveTintColor: '#119988', // Customize active tab color
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'home2':
              iconName = 'home';  
              return <Ionicons name={iconName}  size={size} color={color} />;
    
            default:
              return null;
          }
        },
      })}
    >
      <Tab.Screen name="home2" component={Patienthomepage}  options={{tabBarStyle:{display:"none"}}} />
    </Tab.Navigator>
  );
};

const Stack = createNativeStackNavigator();

const AppNavigator2 = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Pmain" component={DrawerNavigator2} />
      {/* Add other stack screens here if needed */}
    </Stack.Navigator>
  );
};

const Drawer = createDrawerNavigator();

const DrawerNavigator2 = () => {
  return (
    <Drawer.Navigator  drawerContent={(props) => <CustomDrawer {...props} />}
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
        name="Home"
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

export default AppNavigator2;