import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const HospitalConditionsCard: React.FC = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Condiciones para el Descuento del 50%:</Text>
      <Text style={styles.item}>1. Presentación de cita médica oficial y documento del paciente.</Text>
      <Text style={styles.item}>2. Proceso de verificación KYC del solicitante.</Text>
      <Text style={styles.item}>3. Confirmación directa de la cita por el equipo de soporte.</Text>
      <Text style={styles.item}>4. Sujeto al presupuesto mensual asignado del programa.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  title: {
    color: '#F8FAFC',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 8,
  },
  item: {
    color: '#CBD5E1',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 4,
  },
});
