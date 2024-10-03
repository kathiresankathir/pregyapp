import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PatientRecord from './PatientRecord';
import SettingsScreen from './Settings';
import PatientList from './(home-out)/screens/PatientList';
import Addpatient from './(home-out)/screens/AddPatient';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import CustomDrawer from './(home-out)/component/CustomDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Homepage from './(home-out)/screens/Homepage';


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // Hide the header for bottom tabs
        tabBarStyle: { backgroundColor: '#ffffff' }, // Customize the tab bar style
        tabBarLabelStyle: {  } ,// Customize the tab label style
        tabBarActiveTintColor: '#119988', // Customize active tab color
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'home':
              iconName = 'home';  
              return <Entypo name={iconName}  size={size} color={color} />;
            case 'Patient list':
              iconName = 'person';
              return <Ionicons name={iconName}  size={size} color={color} />;
           
            case 'Add Patient':
              iconName = 'person-add';
              return <Ionicons name={iconName}  size={size} color={color} />;
           
            default:
              return null;
          }
        },
      })}
    >
      <Tab.Screen name="home" component={Homepage} />
      <Tab.Screen name="Patient list" component={PatientList} options={{tabBarStyle:{display:"none"}}} />
      <Tab.Screen name="Add Patient" component={Addpatient} />
    </Tab.Navigator>
  );
};

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={DrawerNavigator} />
      {/* Add other stack screens here if needed */}
    </Stack.Navigator>
  );
};

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
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

export default AppNavigator;