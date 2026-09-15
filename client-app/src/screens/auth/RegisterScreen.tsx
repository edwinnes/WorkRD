import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { apiService } from '../../services/apiService';

export const RegisterScreen = ({ navigation }: any) => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleRegister = async () => {
    if (!name.trim() || !phone.trim()) {
      Alert.alert('Atención', 'Por favor completa todos los campos.');
      return;
    }

    setLoading(true);
    const response = await apiService.registerUser(name, phone);
    setLoading(false);

    if (response.success) {
      login(name, phone);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bienvenido a Nosotros RD</Text>
      <Text style={styles.subText}>Regístrate para solicitar un viaje seguro</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        placeholderTextColor="#A0AEC0"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        placeholderTextColor="#A0AEC0"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <Button
        title={loading ? "Procesando..." : "Continuar"}
        onPress={handleRegister}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subText: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#1E293B',
    color: '#FFFFFF',
    padding: 14,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
});
