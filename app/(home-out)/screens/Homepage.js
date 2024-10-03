import React, {useState, useEffect, useLayoutEffect,useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
  RefreshControl,
  Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView} from 'react-native-safe-area-context';
import { Octicons,Entypo,FontAwesome } from '@expo/vector-icons';
import Addpatlog from './Addpatlog';
// import Addpatient from './AddPatient';
// import PatientList from './PatientList'
import axios from 'axios';
import socketIOClient from 'socket.io-client';
import {ActivityIndicator} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import NoResultsIndicator from './NoResultsIndicator';
import { useNavigation } from '@react-navigation/native';
import ParallaxLayer from './Parallaxlayers'; // Ensure this component is correctly imported
import Categories from './Categories';
import { API_SERVER_URL } from '../../Context/config';
import { API_SERVER_SOCKET } from '../../Context/config';

const Stack = createStackNavigator();

const Homepage = React.memo(() => {
  const navigation = useNavigation();
  const [doctorID, setDoctorID] = useState(null);
  const [user,setUser]= useState(null);
  const [name, setName] = useState(null);


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
          if (userData && userData.username && userData.doctorid) {
            setDoctorID(userData.doctorid);
            setUser(userData.username);
            setName(userData.name);


          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);


  const [searchQuery, setSearchQuery] = useState('');
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const socket = socketIOClient(`${API_SERVER_SOCKET}`);

// search option

  const handleSearch = text => {
    setSearchQuery(text);
    const filtered = patients.filter(patient =>
      patient.name.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredPatients(filtered);
  };

  const fetchPatients = async () => {
    try {
      const response = await axios.get(`${API_SERVER_URL}/patients?doctorID=${doctorID}`);
      const orderresponse = response.data.reverse();
      setPatients(orderresponse);
      setFilteredPatients(orderresponse);
      setLoading(false);
    } catch (error) {
      console.log('Error fetching patients:', error);
      setLoading(false);
    }
  };

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
          console.log('Doctor ID:', response.data.doctorid);
          const doctorID = response.data.doctorid;
          setDoctorID(doctorID);


          if (doctorID !== null && patients.length === 0) {
            const response = await axios.get(
              `${API_SERVER_URL}/patients?doctorID=${doctorID}`,
            );
            setPatients(response.data);
            setFilteredPatients(response.data);
            setLoading(false);
          }
        }
      } catch (error) {
        console.log('Error:', error);
      }
    };
    fetchData();
  
   socket.on('new-patient', newPatient => {
  // Check if the newPatient is not already in the patients list
  if (!patients.find(patient => patient._id === newPatient._id)) {
    setPatients(prevPatients => [...prevPatients, newPatient]);
    setFilteredPatients(prevPatients => [...prevPatients, newPatient]);
  }
});
    return () => {
      socket.disconnect();
    };
  }, []);
  
//refresh control
  const onRefresh = async () => {
    setRefreshing(true);
      setRefreshing(false);
  };

  return (
    <SafeAreaView>
    <View style={styles.homescreen}>
      <View style={styles.header}>
       <View style={styles.profile}>
        <Text style={{ color: '#119988', fontSize: 32, fontWeight: 'bold' }}>
         {name && name[0]}
         </Text>
        </View> 
       <Text style={{fontWeight:'bold',fontSize:18}}>Dr. {name}</Text> 
       <View >
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
           <Octicons name="three-bars" size={24} color="black" />
          </TouchableOpacity>
       </View>       
      </View>
     <View>
       <View style={{flexDirection:'column'}}>
         <View style={styles.search}>
              <TextInput
                placeholder="Search patient"
                placeholderTextColor="#2f2f2f"
                value={searchQuery}
                onChangeText={handleSearch}
                style={styles.input}
              />
              <FontAwesome
                style={styles.seicon}
                name="search"
                size={24}
                color="#199999"
              />
         </View>
          <View style={{top:20}}>
              <View style={styles.hader}>    
              </View>
              <ParallaxLayer/> 
          </View>
          
          <View style={{top:175}}>
            <Text style={{fontWeight:'bold',fontSize:18,paddingLeft:10}} >Categorie</Text>
            <Categories/>
            </View>
       </View>
        <View style={styles.recentlyViewedContainer}>
       <Text style={styles.recentlyViewedTitle}> Viewed Patients...   
       <Entypo name="back-in-time" size={20} color="black" /></Text>
     <View>
      <View style={styles.list}>
        {loading ? (
          <ActivityIndicator size="large" color="#119988" />
        ) : filteredPatients.length === 0 ? (
          <NoResultsIndicator />
        ) : (
          <FlatList
            style={styles.sv}
            data={filteredPatients}
            keyExtractor={(item, index) => item._id ? item._id.toString() : index.toString()} // Added a fallback for the index
            renderItem={({item}) => (
              <TouchableOpacity style={styles.listbox} >
                <View style={styles.listitem}>
                  <View style={styles.cir}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 18,
                        fontWeight: 'bold',
                      }}>
                      {item.name[0].toUpperCase()}
                    </Text>
                  </View>
                </View> 

                <View style={styles.patientcontent}>
                  <View >
                  <Text style={[styles.tcontent, styles.text]}> {item.name} </Text>
                  </View>
                  
                  <Text style={{color:"#14b8a5"}}> P_Id :({item.patientid})</Text>
                </View>
              </TouchableOpacity>
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </View>
    </View>
    </View>
    </View>
  </View>
  </SafeAreaView>
);
});
export default function Homepagestack() {
  return (
    <Stack.Navigator
      initialRouteName="Homepage"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Homepage"  component={Homepage} />
      <Stack.Screen name="Addpatlog" component={Addpatlog}/>
      {/* <Stack.Screen name="PatientListstack" component={PatientList}/> */}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  
  recentlyViewedTitle: {
    paddingLeft:10,
    fontSize: 18,
    fontWeight:'bold',
  },
  recentlyViewedContainer: {
  top:300,
  },


  list:{
padding:10,
  },
 
 
  input: {
    height: 50,
    width: '100%',
    top: 10,
    backgroundColor: '#fff',
    borderRadius: 50,
    paddingLeft: 20,
    fontWeight: 'bold'
  },
  homescreen: {
    flexDirection: 'column',
  },
  search: {
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
hader:{
  top:10,

},
  header: {
    padding:10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent:'space-between',
    backgroundColor:"#119988"
  },
  profile: {
    height: 56,
    width: 56,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    left:"20%",
  },
  text: {
    color: '#2f2f2f',
  },
  img3: {
  
    height: 30,
    width: 30,
    padding: 10,
    top: -5,
  },
  listbox: {
    height: 80,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 10,
    paddingLeft: 20,
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {height: 1, width: 0},
    shadowOpacity: 0.2,
    shadowRadius: 0.5,
    elevation: 1,
  },
  txt: {
    fontSize: 18,
    fontWeight: 'bold',
    top: 30,
    left: 20,
  },
  search: {
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 50,
    width: '100%',
    top: 10,
    backgroundColor: '#fff',
    borderRadius: 50,
    paddingLeft: 20,
  },
  seicon: {
    top: 12,
    right: 40,
    height: 30,
    width: 30,
  },
   cir: {
    height: 40,
    width: 40,
    backgroundColor: '#119988',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sv: {
    height: '73.2%',
    ...Platform.select({
      android: {height: '75.89%'},
    }),
  },
  tcontent: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  patientcontent: {
    paddingLeft: 20,
    flexDirection:"row",
    justifyContent:'space-evenly',
    alignItems:'center'
  },
});
// export default Homepage;
