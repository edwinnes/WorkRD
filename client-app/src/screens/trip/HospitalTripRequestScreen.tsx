import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { MainLayout } from '../../layouts/MainLayout';
import { Button } from '../../components/ui/Button';

interface Hospital {
  id: string;
  name: string;
  address: string;
  icon: string;
}

const HOSPITALS_LIST: Hospital[] = [
  { id: '1', name: 'Plaza de la Salud (HGPS)', address: 'Av. Ortega y Gasset, Santo Domingo', icon: '🏥' },
  { id: '2', name: 'Centro Médico CEDIMAT', address: 'Calle Pepillo Salcedo, Santo Domingo', icon: '🩺' },
  { id: '3', name: 'Hospital Metropolitano de Santiago (HOMS)', address: 'Autopista Duarte Km 2.8, Santiago', icon: '🏥' },
  { id: '4', name: 'Hospital Ney Arias Lora', address: 'Av. Charles de Gaulle, Santo Domingo Norte', icon: '🚑' },
  { id: '5', name: 'Clínica Abreu', address: 'Calle Beller #42, Santo Domingo', icon: '🏥' },
];

export const HospitalTripRequestScreen = () => {
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [appointmentDoc, setAppointmentDoc] = useState<string | null>(null);
  const [identityDoc, setIdentityDoc] = useState<string | null>(null);

  const handlePickDocument = (type: string) => {
    Alert.alert(
      'Módulo Inhabilitado',
      'La función de carga de archivos y solicitudes con el 50% de descuento estará inhabilitada temporalmente hasta que la empresa se encuentre capitalizada y con presupuesto mensual activo.'
    );
  };

  const handleSelectHospital = (hospital: Hospital) => {
    setSelectedHospital(hospital);
  };

  return (
    <MainLayout showSecurityBanner={false}>
      <ScrollView style={styles.container}>
        {/* Banner de Estado Inhabilitado */}
        <View style={styles.disabledBanner}>
          <Text style={styles.disabledTitle}>⚠️ Módulo Inhabilitado por el Momento</Text>
          <Text style={styles.disabledText}>
            La Triangulación Hospitalaria y el descuento del 50% se activarán oficialmente tan pronto como la empresa se encuentre totalmente capitalizada. A continuación se muestra la interfaz predeterminada del sistema.
          </Text>
        </View>

        <Text style={styles.title}>Selección de Viaje Hospitalario</Text>
        <Text style={styles.subtitle}>
          Selecciona un centro de salud autorizados para desplegar la ruta y configurar tus documentos.
        </Text>

        {/* Lista de Hospitales con Íconos */}
        <Text style={styles.sectionHeader}>Hospitales Disponibles</Text>
        {HOSPITALS_LIST.map((hospital) => {
          const isSelected = selectedHospital?.id === hospital.id;
          return (
            <TouchableOpacity
              key={hospital.id}
              style={[styles.hospitalCard, isSelected && styles.selectedHospitalCard]}
              onPress={() => handleSelectHospital(hospital)}
            >
              <Text style={styles.hospitalIcon}>{hospital.icon}</Text>
              <View style={styles.hospitalInfo}>
                <Text style={styles.hospitalName}>{hospital.name}</Text>
                <Text style={styles.hospitalAddress}>{hospital.address}</Text>
              </View>
              {isSelected && <Text style={styles.checkIcon}>✅</Text>}
            </TouchableOpacity>
          );
        })}

        {/* Despliegue del Mapa tras la Selección */}
        {selectedHospital && (
          <View style={styles.mapContainer}>
            <Text style={styles.mapTitle}>🗺️ Ruta Hacia: {selectedHospital.name}</Text>
            <View style={styles.mapPlaceholder}>
              <Text style={styles.mapPlaceholderText}>📍 Mapa de Ruta Trazada al Hospital</Text>
              <Text style={styles.mapSubtext}>GPS Sentinel Activo • {selectedHospital.address}</Text>
            </View>
          </View>
        )}

        {/* Configuración de Archivos Requeridos */}
        <View style={styles.uploadSection}>
          <Text style={styles.sectionHeader}>Configuración de Carga de Archivos</Text>

          <TouchableOpacity 
            style={styles.uploadButton}
            onPress={() => handlePickDocument('cita')}
          >
            <Text style={styles.uploadIcon}>📄</Text>
            <View style={styles.uploadTextContainer}>
              <Text style={styles.uploadLabel}>Comprobante de Cita Médica</Text>
              <Text style={styles.uploadStatus}>
                {appointmentDoc ? appointmentDoc : 'Adjuntar comprobante oficial (Inhabilitado)'}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.uploadButton}
            onPress={() => handlePickDocument('identidad')}
          >
            <Text style={styles.uploadIcon}>🪪</Text>
            <View style={styles.uploadTextContainer}>
              <Text style={styles.uploadLabel}>Documento del Paciente (KYC)</Text>
              <Text style={styles.uploadStatus}>
                {identityDoc ? identityDoc : 'Adjuntar cédula o pasaporte (Inhabilitado)'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Descripción del Proceso */}
        <View style={styles.descriptionBox}>
          <Text style={styles.descriptionTitle}>Condiciones de la Triangulación Hospitalaria:</Text>
          <Text style={styles.descriptionItem}>• Presentación de cita oficial y verificación de identidad.</Text>
          <Text style={styles.descriptionItem}>• Proceso de validación KYC del paciente.</Text>
          <Text style={styles.descriptionItem}>• Confirmación telefónica o presencial por el equipo de soporte.</Text>
          <Text style={styles.descriptionItem}>• Fondo mensual limitado sujeto a la capitalización de la compañía.</Text>
        </View>

        <View style={styles.actionContainer}>
          <Button 
            title="Solicitar Viaje al Hospital (Inhabilitado)" 
            variant="secondary"
            onPress={() => {
              Alert.alert(
                'Servicio Temporale Inactivo',
                'El servicio estará disponible en cuanto concluya la fase de capitalización y asignación del presupuesto mensual.'
              );
            }} 
          />
        </View>
      </ScrollView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
  disabledBanner: {
    backgroundColor: '#7F1D1D',
    borderColor: '#EF4444',
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    marginBottom: 20,
  },
  disabledTitle: {
    color: '#FCA5A5',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 6,
  },
  disabledText: {
    color: '#FEE2E2',
    fontSize: 12,
    lineHeight: 18,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  subtitle: {
    color: '#94A3B8',
    fontSize: 13,
    marginBottom: 20,
  },
  sectionHeader: {
    color: '#38BDF8',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 12,
  },
  hospitalCard: {
    backgroundColor: '#1E293B',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  selectedHospitalCard: {
    borderColor: '#38BDF8',
    backgroundColor: '#0F2744',
  },
  hospitalIcon: {
    fontSize: 24,
    marginRight: 14,
  },
  hospitalInfo: {
    flex: 1,
  },
  hospitalName: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  hospitalAddress: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 2,
  },
  checkIcon: {
    fontSize: 16,
  },
  mapContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  mapTitle: {
    color: '#38BDF8',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 8,
  },
  mapPlaceholder: {
    height: 160,
    backgroundColor: '#0F172A',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#38BDF8',
  },
  mapPlaceholderText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  mapSubtext: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 4,
  },
  uploadSection: {
    backgroundColor: '#1E293B',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  uploadButton: {
    backgroundColor: '#0F172A',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  uploadIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  uploadTextContainer: {
    flex: 1,
  },
  uploadLabel: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
  uploadStatus: {
    color: '#64748B',
    fontSize: 11,
    marginTop: 2,
  },
  descriptionBox: {
    backgroundColor: '#1E293B',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  descriptionTitle: {
    color: '#F8FAFC',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 8,
  },
  descriptionItem: {
    color: '#CBD5E1',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 4,
  },
  actionContainer: {
    marginBottom: 40,
  },
});
