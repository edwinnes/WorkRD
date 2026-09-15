import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Hospital } from './HospitalCardItem';

export const HospitalMapPreview: React.FC<{ hospital: Hospital }> = ({ hospital }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🗺️ Ruta Trazada: {hospital.name}</Text>
      <View style={styles.mapBox}>
        <Text style={styles.mapText}>📍 Destino: {hospital.name}</Text>
        <Text style={styles.subText}>GPS Sentinel Activo • {hospital.address}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    color: '#38BDF8',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 8,
  },
  mapBox: {
    height: 160,
    backgroundColor: '#0F172A',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#38BDF8',
  },
  mapText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  subText: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 4,
  },
});
