import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  StatusBar
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API_SERVER_URL} from '../../Context/config';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { createStackNavigator } from '@react-navigation/stack';
import { API_SERVER_SOCKET } from '../../Context/config';
const Stack = createStackNavigator();

const Addpatient = ({ navigation }) => {
  const [filledFields, setFilledFields] = useState(0);
  const [resetForm, setResetForm] = useState(false);

  const [patientData, setPatientData] = useState({
    name: '',
    patientid: '',
    mobile: 0,
    haemoglobin: 0,
    age: 0,
    bloodGroup: '',
    weight: 0,
    height: 0,
    doctorid: '',
  });
  const [isSaveButtonActive, setIsSaveButtonActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveReport = () => {
    // Your logic to save the report goes here

    // Show success message
    showMessage({
      message: 'Report saved successfully!',
      type: 'success',
    });
  };

  const getDoctorID = async () => {
    try {
      const token = await AsyncStorage.getItem('authtoken');
      if (token) {
        const response = await axios.get(`${API_SERVER_URL}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = response.data;
        if (userData && userData.doctorid) {
          setPatientData({ ...patientData, doctorid: userData.doctorid });
        }
      }
    } catch (error) {
      console.error('Error getting doctorID from token:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setPatientData({ ...patientData, [field]: value });

    // Update the filledFields state based on the filled input fields
    if (value !== '' && value !== 0) {
      setFilledFields(prevFilledFields => prevFilledFields + 1);
    }
  };

  const isFormValid = () => {
    // Check if all required input fields are not empty, not equal to 0, and not empty strings
    return (
      patientData.name !== '' &&
      patientData.patientid !== '' &&
      patientData.mobile !== 0 &&
      patientData.age !== 0 &&
      patientData.bloodGroup !== '' &&
      patientData.weight !== '' &&
      patientData.height !== '' &&
      patientData.name.trim() !== '' &&
      patientData.patientid.trim() !== '' &&
      patientData.bloodGroup.trim() !== ''
    );
  };

  const calculateProgress = () => {
    const totalFields = Object.keys(patientData).length;
    const progress = (filledFields / totalFields) * 100;
    return progress.toFixed(0); // Round to the nearest integer
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${API_SERVER_URL}/patients`, patientData);
  
      showMessage({
        message: 'Patient details saved successfully!',
        type: 'success',
      });
  
      // Extract last 4 digits of the mobile number
      const lastFourDigits = patientData.mobile.toString().slice(-4);
  
      // Navigate to Addpatlog and pass the required parameters
      navigation.navigate("Addpatlog", {
        name: patientData.name,
        doctorid: patientData.doctorid,
        mobile: lastFourDigits,
        userType: 'patient',// Assuming user type is always 'patient'
        username:patientData.patientid ,
      });
  
      // Reset form fields to initial state
      setPatientData({
        name: '',
        patientid: '',
        mobile: 0,
        haemoglobin: 0,
        age: 0,
        bloodGroup: '',
        weight: 0,
        height: 0,
        doctorid: '',
      });
  
      setFilledFields(0); // Reset filled fields counter
      setResetForm(true); // Optionally set this to true if you want to handle placeholder display
    } catch (error) {
      console.error('Error saving patient data:', error);
      showMessage({
        message: 'Error saving patient details.',
        type: 'danger',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  
  

  useEffect(() => {
    getDoctorID();
  }, []);

  useEffect(() => {
    // Update the button state when the form data changes
    setIsSaveButtonActive(isFormValid());
  }, [patientData]);

  return (
    <SafeAreaView style={styles.container}>
    <StatusBar />
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* <View style={styles.body}> */}
          {/* <View style={styles.mainblock}> */}
            <View style={styles.whitebox}>
              <View style={styles.header}>
                <Text style={styles.txt}>Add Patient</Text>
              </View>
              <TextInput
                placeholder="Name *"
                placeholderTextColor={'#a6a6a6'}
                onChangeText={text => handleInputChange('name', text)}
                style={styles.inputbox}
                value={resetForm ? '' : patientData.name} // Show placeholder when resetForm is true
              />
              <TextInput
                placeholder="Patient id *"
                placeholderTextColor={'#a6a6a6'}
                onChangeText={text => handleInputChange('patientid', text)}
                style={styles.inputbox}
                value={resetForm ? '' : patientData.patientid}
              />
              <TextInput
                placeholder="Mobile *"
                placeholderTextColor={'#a6a6a6'}
                keyboardType="number-pad"
                onChangeText={Number => handleInputChange('mobile', Number)}
                style={styles.inputbox}
                value={resetForm ? '' : patientData.mobile}

              />
              <TextInput
                placeholder="Age *"
                placeholderTextColor={'#a6a6a6'}
                keyboardType="number-pad"
                onChangeText={Number => handleInputChange('age', Number)}
                style={styles.inputbox}
                value={resetForm ? '' : patientData.age}

              />
              <TextInput
                placeholder="Haemoglobin *"
                placeholderTextColor={'#a6a6a6'}
                keyboardType="number-pad"
                onChangeText={Number => handleInputChange('haemoglobin', Number)}
                style={styles.inputbox}
                value={resetForm ? '' : patientData.haemoglobin}

              />
              <TextInput
                placeholder="BloodGroup *"
                placeholderTextColor={'#a6a6a6'}
                onChangeText={text => handleInputChange('bloodGroup', text)}
                style={styles.inputbox}
                value={resetForm ? '' : patientData.bloodGroup}

              />
              <TextInput
                placeholder="Weight in kg *"
                placeholderTextColor={'#a6a6a6'}
                keyboardType="number-pad"
                onChangeText={Number => handleInputChange('weight', Number)}
                style={styles.inputbox}
                value={resetForm ? '' : patientData.weight}

              />
              <TextInput
                placeholder="Height in cm*"
                placeholderTextColor={'#a6a6a6'}
                keyboardType="number-pad"
                onChangeText={Number => handleInputChange('height', Number)}
                style={styles.inputbox}
                value={resetForm ? '' : patientData.height}

              />
              <TouchableOpacity
                style={
                  isSaveButtonActive
                    ? styles.activeSaveButton
                    : styles.disabledSaveButton
                }
                onPress={handleSubmit}
                disabled={!isSaveButtonActive || isLoading}>
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.start}>Save</Text>
                )}
              </TouchableOpacity>
              <FlashMessage position="top" animated={true} icon={'success'} statusBarHeight={10} style={{ backgroundColor: "#119988" }} />
            </View>
          {/* </View> */}
      </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>
);
};

export default Addpatient
 
const styles = StyleSheet.create({
progressBarContainer: {
  height: 10,
  backgroundColor: '#119988',
  borderRadius: 20,
  marginVertical: 10,
},
container: {
  flex: 1,
  backgroundColor: 'white',
},
scrollViewContent: {
  flexGrow: 1,
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBottom: 20,
  ...Platform.select({
    android: { paddingTop: 50 },
  }),
},
body: {
  flex: 1,
  alignItems: 'center',
},
mainblock: {
  width: '100%',
  backgroundColor: '#f2f2f2',
},
whitebox: {
  width: 350,
  backgroundColor: '#fff',
  alignItems: 'center',
  paddingTop: 0,
},
header: {
  alignItems: 'center',
  flexDirection: 'row',
  borderRadius: 10,
},
txt: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#119988',
},
activeSaveButton: {
  width: '100%',
  paddingLeft: 20,
  paddingRight: 20,
  height: 50,
  borderRadius: 50,
  backgroundColor: '#199991',
  alignItems: 'center',
  justifyContent: 'center',
  top: 70,
},
disabledSaveButton: {
  width: '100%',
  paddingLeft: 20,
  paddingRight: 20,
  height: 50,
  borderRadius: 50,
  backgroundColor: '#d9d9d9',
  alignItems: 'center',
  justifyContent: 'center',
  top: 70,
},
start: {
  color: '#fff',
  fontWeight: 'normal',
  fontSize: 18,
},
inputbox: {
  width: '100%',
  height: 50,
  backgroundColor: '#fff',
  borderWidth: 0.5,
  borderRadius: 5,
  borderColor: '#d9d9d9',
  marginTop: 10,
  paddingLeft: 20,
},
});
