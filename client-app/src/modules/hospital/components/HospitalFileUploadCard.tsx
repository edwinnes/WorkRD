import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export const HospitalFileUploadCard: React.FC = () => {
  const handleDisabledNotice = () => {
    Alert.alert(
      'Módulo Inhabilitado',
      'La función de carga de archivos estará inhabilitada hasta que la empresa se encuentre capitalizada y el presupuesto mensual asignado entre en vigencia.'
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Configuración de Carga de Archivos</Text>

      {/* Campo Cita Médica */}
      <TouchableOpacity style={styles.uploadBtn} onPress={handleDisabledNotice}>
        <Text style={styles.icon}>📄</Text>
        <View style={styles.textContainer}>
          <Text style={styles.label}>Comprobante de Cita Médica</Text>
          <Text style={styles.status}>Adjuntar archivo PDF o Imagen (Inhabilitado)</Text>
        </View>
      </TouchableOpacity>

      {/* Campo Documento KYC */}
      <TouchableOpacity style={styles.uploadBtn} onPress={handleDisabledNotice}>
        <Text style={styles.icon}>🪪</Text>
        <View style={styles.textContainer}>
          <Text style={styles.label}>Documento del Paciente (KYC)</Text>
          <Text style={styles.status}>Adjuntar cédula o pasaporte (Inhabilitado)</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E293B',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  header: {
    color: '#38BDF8',
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 12,
  },
  uploadBtn: {
    backgroundColor: '#0F172A',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  icon: {
    fontSize: 20,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
  status: {
    color: '#64748B',
    fontSize: 11,
    marginTop: 2,
  },
});
