import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '../../components/ui/Button';

export const HospitalTriangulationScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Triangulación Hospitalaria</Text>
      <Text style={styles.description}>
        Obtén un 50% de descuento en tus viajes a centros de salud. Requisitos:
      </Text>

      <View style={styles.box}>
        <Text style={styles.item}>• Comprobante de cita médica oficial</Text>
        <Text style={styles.item}>• Documentos oficiales del paciente</Text>
        <Text style={styles.item}>• Verificación KYC completada</Text>
        <Text style={styles.item}>• Confirmación por el equipo de soporte</Text>
      </View>

      <Button title="Subir Documentos para Verificación" onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#EF4444',
    marginBottom: 12,
  },
  description: {
    color: '#CBD5E1',
    fontSize: 14,
    marginBottom: 16,
  },
  box: {
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  item: {
    color: '#F8FAFC',
    fontSize: 14,
    marginBottom: 8,
  },
});
