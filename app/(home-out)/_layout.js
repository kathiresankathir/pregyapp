import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from '../Home';
import AppNavigator2 from '../Phome';


export default function Layout() {
  return(
    <>
    <AppNavigator />
    <AppNavigator2></AppNavigator2>
    </>
  )

 
}
