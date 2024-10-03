import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
const Resetjson = () => {
  return (
    <View style={styles.container}>
     <LottieView style={{height:200,width:200}}
        source={require('../../../src/images/lottie.json')} 
        autoPlay
        loop
      />
      <View style={{flexDirection:"row", alignItems:"center", top:10}}>
      <Text style={styles.text}>Reset Your Password</Text>
      <AntDesign style={{left:10,top:5}} name="exclamationcircleo" size={24} color="#119988" />
      </View>
      
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#119988',
  },
});

export default Resetjson;