import { View, Text, Image, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
 // Assuming this is a valid SVG image

const Welcome = ({ navigation }) => {
  const { width, height } = useWindowDimensions(); // Dynamically get width and height

  return (
    <View style={[styles.frame, { paddingHorizontal: width * 0.05 }]}>
      {/* <Text style={[styles.fullform, { marginTop: height * 0.1 }]}>Saveetha Medical College and Hospitals</Text> */}
      
      <View style={styles.logos}>
      
        
        <Image
          style={[styles.tinyLogo, { width: width * 0.8, height: height * 0.35 }]}
           source={require('@/src/images/image1.png')}
        />
            <Text style={styles.fullform}>Consult Specialist Doctors Securely And Privately </Text>

        <TouchableOpacity
          
          style={[styles.loginbtn, { marginTop: height * 0.1, paddingHorizontal: width * 0.2 }]}
        >
         <Link href="/UserTypeToggle"><Text style={styles.start}>Get Started</Text></Link>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logos: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tinyLogo: {
    resizeMode: 'contain',
  },
  img2: {
    position: 'relative',
    resizeMode: 'contain',
  },
  fullform: {
    fontSize: 18,
    color: '#2f2f2f',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginbtn: {
    height: 50,
    borderRadius: 50,
    backgroundColor: '#119988',
    alignItems: 'center',
    justifyContent: 'center',
  },
  start: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
