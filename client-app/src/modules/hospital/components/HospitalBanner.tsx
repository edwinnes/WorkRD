import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const HospitalBanner: React.FC = () => {
  return (
    <View style={styles.banner}>
      <Text style={styles.title}>⚠️ Módulo Inhabilitado Temporalmente</Text>
      <Text style={styles.description}>
        La Triangulación Hospitalaria y el descuento del 50% se activarán oficialmente tan pronto como la empresa se encuentre totalmente capitalizada y asignado el presupuesto mensual correspondiente.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#7F1D1D',
    borderColor: '#EF4444',
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    marginBottom: 20,
  },
  title: {
    color: '#FCA5A5',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 6,
  },
  description: {
    color: '#FEE2E2',
    fontSize: 12,
    lineHeight: 18,
  },
});
