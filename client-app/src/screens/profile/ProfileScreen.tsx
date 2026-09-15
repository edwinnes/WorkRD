import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MainLayout } from '../../layouts/MainLayout';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';

export const ProfileScreen = ({ navigation }: any) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Register' }],
    });
  };

  return (
    <MainLayout showSecurityBanner={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Perfil de Usuario</Text>
        
        <View style={styles.infoBox}>
          <Text style={styles.label}>Usuario Activo:</Text>
          <Text style={styles.value}>{user?.name || 'Usuario General'}</Text>
          <Text style={styles.subValue}>{user?.phone || 'Sin teléfono'}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Estado de Verificación:</Text>
          <Text style={styles.value}>🛡️ Identidad Validada (KYC)</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Beneficio Activo:</Text>
          <Text style={styles.value}>Programa Triangulación Hospitalaria</Text>
        </View>

        <Button title="Cerrar Sesión" variant="secondary" onPress={handleLogout} />
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  label: {
    color: '#94A3B8',
    fontSize: 12,
    marginBottom: 4,
  },
  value: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '600',
  },
  subValue: {
    color: '#38BDF8',
    fontSize: 14,
    marginTop: 2,
  },
});
