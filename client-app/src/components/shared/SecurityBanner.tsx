import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const SecurityBanner: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛡️ Sentinel Active Protection</Text>
      <Text style={styles.subtitle}>Conexión cifrada y monitoreo de seguridad en vivo</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1A202C',
    borderColor: '#2B6CB0',
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
  },
  title: {
    color: '#63B3ED',
    fontWeight: 'bold',
    fontSize: 14,
  },
  subtitle: {
    color: '#A0AEC0',
    fontSize: 12,
  },
});
