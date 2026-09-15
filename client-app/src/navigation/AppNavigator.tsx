import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { HomeScreen } from '../screens/home/HomeScreen';
import { TripCategoryScreen } from '../screens/trip/TripCategoryScreen';
import { HospitalTriangulationScreen } from '../screens/trip/HospitalTriangulationScreen';
import { ActiveTripScreen } from '../screens/trip/ActiveTripScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { KmBankScreen } from '../screens/profile/KmBankScreen';

const Stack = createStackNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Register"
      screenOptions={{
        headerStyle: { backgroundColor: '#0F172A' },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Nosotros RD' }} />
      <Stack.Screen name="TripCategory" component={TripCategoryScreen} options={{ title: 'Categorías de Viaje' }} />
      <Stack.Screen name="HospitalTriangulation" component={HospitalTriangulationScreen} options={{ title: 'Triangulación Hospitalaria' }} />
      <Stack.Screen name="ActiveTrip" component={ActiveTripScreen} options={{ title: 'Estado del Viaje' }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Mi Perfil' }} />
      <Stack.Screen name="KmBank" component={KmBankScreen} options={{ title: 'Banco de KM' }} />
    </Stack.Navigator>
  );
};
