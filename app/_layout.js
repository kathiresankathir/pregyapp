import React, { useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AuthProvider, { AuthContext } from './Context/AuthContext';
import AuthStack from './AuthStack';
import AppNavigator from './Home'; // Doctor Navigator
import AppNavigator2 from './Phome'; // Patient Navigator

function RootContent() {
  const { usertoken, userType, IsLoading } = useContext(AuthContext);

  if (IsLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#119988" />
      </View>
    );
  }

  // Debugging logs
  console.log('User Token:', usertoken);
  console.log('User Type:', userType);
  console.log('Is Loading:', IsLoading);

  // Determine which navigator to display
  if (userType === 'doctor') {
    return usertoken ? <AppNavigator /> : <AuthStack />;
  } else if (userType === 'patient') {
    return usertoken ? <AppNavigator2 /> : <AuthStack />;
  }

  // Fallback to AuthStack if no user type is set
  return <AuthStack />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootContent />
    </AuthProvider>
  );
}
