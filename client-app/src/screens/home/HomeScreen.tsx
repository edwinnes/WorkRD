import React, { useState, useEffect } from 'react';
import { ScrollView, Text, StyleSheet, View, Alert } from 'react-native';
import { Button } from '../../components/ui/Button';
import { SecurityBanner } from '../../components/shared/SecurityBanner';
import { MapPreview } from '../../components/shared/MapPreview';
import { locationService } from '../../services/locationService';

export const HomeScreen = ({ navigation }: any) => {
  const [origin, setOrigin] = useState('Obteniendo posición GPS...');
  const [destination, setDestination] = useState('');

  useEffect(() => {
    locationService.getCurrentLocation().then((coords) => {
      setOrigin(coords.address || 'Ubicación actual');
    });
  }, []);

  const handleRequestTrip = () => {
    if (!destination) {
      Alert.alert('Selecciona un destino', 'Por favor, define hacia dónde te dirijes antes de continuar.');
      return;
    }
    navigation.navigate('TripCategory', { origin, destination });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>¿A dónde vamos hoy?</Text>
      
      <SecurityBanner />

      <MapPreview
        origin={origin}
        destination={destination || 'Toca para elegir destino'}
        onSelectDestination={() => {
          setDestination('Av. Winston Churchill, Santo Domingo');
        }}
      />

      <View style={styles.actionContainer}>
        <Button 
          title="Solicitar Viaje" 
          onPress={handleRequestTrip} 
        />
        <Button 
          title="Banco de KM (Beneficios)" 
          variant="secondary"
          onPress={() => navigation.navigate('KmBank')} 
        />
        <Button 
          title="Triangulación Hospitalaria (50% Off)" 
          variant="accent"
          onPress={() => navigation.navigate('HospitalTriangulation')} 
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
    marginTop: 20,
  },
  actionContainer: {
    marginTop: 10,
    marginBottom: 40,
  },
});
