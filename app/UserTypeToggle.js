// UserTypeToggle.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity ,Image, SafeAreaView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import { Link } from 'expo-router';

const UserTypeToggle = () => {
  const navigation = useNavigation();

  const handleSelectUserType = (type) => {
    navigation.navigate('Login', { userType: type }); // Navigate to login with user type
  };

  return (
    <SafeAreaView style={styles.container}>
    <View  style={styles.container1}>
      <View style={styles.container2} >
      <Image  source={require('@/src/images/doctorimg.png')}/>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSelectUserType('doctor')}
      >
        <Text style={styles.buttonText}>Doctor</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.container2}>
      <Image  source={require('@/src/images/patient.png')}/>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSelectUserType('patient')}
      >
        <Text style={styles.buttonText}>Patient</Text>
      </TouchableOpacity>
      </View>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  container1: {
    alignItems:'center',
    padding:20,
  },
  container2: {
    alignItems:'center',
    rowGap:10,
    padding:30,
  },
  title: {
    fontSize: 24,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#119988',
    padding: 10,
    top:10,
    borderRadius: 10,
    width: 150,
    alignItems: 'center',
    justifyContent:"center",
    // marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default UserTypeToggle;
