import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MainLayout } from '../../layouts/MainLayout';
import { Button } from '../../components/ui/Button';

export const ActiveTripScreen = ({ navigation }: any) => {
  return (
    <MainLayout>
      <View style={styles.container}>
        <Text style={styles.header}>Viaje en Curso</Text>

        <View style={styles.card}>
          <Text style={styles.driverLabel}>Conductor Asignado</Text>
          <Text style={styles.driverName}>Socio Conductor</Text>
          <Text style={styles.categoryBadge}>Categoría: Estándar</Text>
        </View>

        <View style={styles.statusBox}>
          <Text style={styles.statusText}>📍 En ruta hacia tu destino</Text>
        </View>

        <Button title="Finalizar / Regresar al Inicio" onPress={() => navigation.navigate('Home')} />
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#38BDF8',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#1E293B',
    padding: 20,
    borderRadius: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  driverLabel: {
    color: '#94A3B8',
    fontSize: 12,
  },
  driverName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
  },
  categoryBadge: {
    color: '#38BDF8',
    marginTop: 8,
    fontSize: 14,
  },
  statusBox: {
    backgroundColor: '#0F766E',
    padding: 14,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  statusText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
