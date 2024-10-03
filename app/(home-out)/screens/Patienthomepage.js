




import {useState, useEffect} from 'react';
import socketIOClient from 'socket.io-client';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View, 
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ScrollView,
  RefreshControl,
  Image
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { API_SERVER_URL, API_SERVER_SOCKET } from '../../Context/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Patientparallax from './Patientparallax';
import Viewreport from './Viewreport';
import Uploadreport from './Uploadreport';
import ViewUploadedReport from './ViewUploadedReport';
import Dietpage from './Dietpage';
import Dietpageone from './Dietpageone';
import Dietpagetwo from './Dietpagetwo';
import Nonvegdiet from './Nonvegdiet';
import Nutsdiet from './Nutsdiet';
import Fruitsdiet from './Fruitsdiet';
// import Images from './Images';
import Graphpage from './Graphpage';
import AnemiaReportscreen from './AnemiaReportscreen';
import HypertensionReportscreen from './HypertensionReportscreen';
import GeneralReportscreen from './GeneralReportscreen';

const Stack = createStackNavigator();

const Patienthomepage = ({ navigation }) => {
  const [doctorID, setDoctorID] = useState(null);
  const [patientID,setPatientID] =useState(null);
  const [patients, setPatients] = useState([]);
  const [name, setName] = useState(null);

  const [user, setUser] = useState(null);
  const socket = socketIOClient(`${API_SERVER_SOCKET}`);

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
          if (userData && userData.username) {
            setUser(userData.username);
            setName(userData.name);

          }

          const doctorID = userData.doctorid;
          setDoctorID(doctorID);

          const patientID =userData.patientid;
          setPatientID(patientID);

          if (doctorID !== null && patients.length === 0) {
            const response = await axios.get(
              `${API_SERVER_URL}/patients?doctorID=${doctorID}`,
            );
            setPatients(response.data);
            
          }
        }
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchData();

    socket.on('new-patient', (newPatient) => {
      if (!patients.find((patient) => patient._id === newPatient._id)) {
        setPatients((prevPatients) => [...prevPatients, newPatient]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [patients]);

  return ( 
    <SafeAreaView style={styles.container}>
    <View>
   <View style={styles.header}>
  <View style={styles.headerContainer}>
    <View style={styles.profile}>
      <Text style={styles.initial}>{name ? name[0] : 'U'}</Text>
    </View>
    <View style={styles.greetingContainer}>
      <Text style={styles.greeting}>Hi, {name || 'User'}</Text>
    </View>
    <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
      <Octicons name="three-bars" size={24} color="black" />
    </TouchableOpacity>
  </View>
</View>

  <View style={styles.logoContainer}>
    <Image source={require('../../../src/images/pathom.png')} />
  </View>
  <ScrollView contentContainerStyle={styles.scrollView}>
    <Text style={styles.categoryTitle}>Categories</Text>
    <Patientparallax />
    <View style={styles.box}>
      <Text style={styles.boxTitle}>View</Text>
      <View style={styles.reportContainer}>
        <TouchableOpacity style={styles.reportBox} onPress={() => navigation.navigate('Viewreport', { doctorID })}>
          <Text style={styles.reportText}>View Report</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.reportBox} onPress={() => navigation.navigate('Uploadreport', { doctorID })}>
          <Text style={styles.reportText}>Upload Report</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.reportBox} onPress={() => navigation.navigate('Dietpage')}>
          <Text style={styles.reportText}>Diet Plan</Text>
        </TouchableOpacity>
      </View>
    </View>
  </ScrollView>
  </View>
</SafeAreaView>
)
}

export default function PatientHm() {
  return (
    <Stack.Navigator initialRouteName="Patienthomepage" >
    <Stack.Screen name="Patienthomepage" component={Patienthomepage} options={{ headerShown: false }} />    
    <Stack.Screen name="Viewreport" component={Viewreport} />
      <Stack.Screen name="Uploadreport" component={Uploadreport} />
      <Stack.Screen name="ViewUploadedReport" component={ViewUploadedReport} />
      <Stack.Screen name="Dietpage" component={Dietpage}  options={{ headerShown: true,headerTitle:'' }}/>
      <Stack.Screen name="Dietpageone" component={Dietpageone} options={{ headerShown: true,headerTitle:'' }} />
      <Stack.Screen name="Dietpagetwo" component={Dietpagetwo} options={{ headerShown: true,headerTitle:'Veg Diet' }} />
      <Stack.Screen name="Nonvegdiet" component={Nonvegdiet} options={{ headerShown: true,headerTitle:'Non-Veg Diet' }} />
      <Stack.Screen name="Nutsdiet" component={Nutsdiet} options={{ headerShown: true,headerTitle:'Fruits Diet' }} />
      <Stack.Screen name="Fruitsdiet" component={Fruitsdiet} options={{ headerShown: true,headerTitle:'Nuts Diet' }} />
      <Stack.Screen name="Graphpage" component={Graphpage} />
      <Stack.Screen name="AnemiaReportscreen" component={AnemiaReportscreen} options={{ headerShown: true,headerTitle:'AnemiaReport' }} />
      <Stack.Screen name="HypertensionReportscreen" component={HypertensionReportscreen} options={{ headerShown: true,headerTitle:'HypertensionReport' }} />
      <Stack.Screen name="GeneralReportscreen" component={GeneralReportscreen}options={{ headerShown: true,headerTitle:'GeneralReport' }} />

    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    paddingVertical: 10, // Add vertical padding to space content evenly
    backgroundColor: "#119988",
    marginTop:30,

  },
  headerContainer: {
    paddingLeft:10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
  }, 
  profile: {
    height: 56,
    width: 56,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    // marginRight: 10, // Space between profile and greeting
  },
  initial: {
    color: '#119988',
    fontSize: 32,
    fontWeight: 'bold',
  },
  greetingContainer: {
    alignItems: 'center',
    marginHorizontal: 10, // Space on both sides of the greeting
  },
  greeting: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  menuButton: {
    padding: 10,
  },
  scrollView: {
    paddingBottom: 20,
  },
  categoryTitle: {
    fontSize: 20,
    padding: 10,
    fontWeight: 'bold',
  },
  box: {
    marginTop:10,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    margin: 10,
    elevation: 2,
  },
  boxTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  reportContainer: {
    flexDirection: 'column',
  },
  reportBox: {
    padding: 30,
    borderRadius: 30,
    backgroundColor: "#119988",
    marginVertical: 10,
    alignItems: 'center',
  },
  reportText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});