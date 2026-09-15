import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, View, Alert } from 'react-native';
import { MainLayout } from '../../../layouts/MainLayout';
import { Button } from '../../../components/ui/Button';
import { HospitalBanner } from '../components/HospitalBanner';
import { HospitalList } from '../components/HospitalList';
import { Hospital } from '../components/HospitalCardItem';
import { HospitalMapPreview } from '../components/HospitalMapPreview';
import { HospitalFileUploadCard } from '../components/HospitalFileUploadCard';
import { HospitalConditionsCard } from '../components/HospitalConditionsCard';

export const HospitalTripRequestScreen = () => {
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);

  const handleRequestTrip = () => {
    Alert.alert(
      'Servicio Temporalmente Inactivo',
      'No es posible procesar solicitudes en este momento. El servicio se activará una vez concluida la fase de capitalización.'
    );
  };

  return (
    <MainLayout showSecurityBanner={false}>
      <ScrollView style={styles.container}>
        {/* Banner de aviso inhabilitado */}
        <HospitalBanner />

        <Text style={styles.title}>Selección de Viaje Hospitalario</Text>
        <Text style={styles.subtitle}>
          Selecciona un centro de salud para desplegar la ruta y configurar tus documentos.
        </Text>

        {/* Lista de Hospitales (Sin mapa al inicio) */}
        <HospitalList
          selectedHospital={selectedHospital}
          onSelectHospital={(hospital) => setSelectedHospital(hospital)}
        />

        {/* El mapa solo se despliega tras elegir un hospital */}
        {selectedHospital && <HospitalMapPreview hospital={selectedHospital} />}

        {/* Tarjeta de Carga de Archivos */}
        <HospitalFileUploadCard />

        {/* Condiciones del servicio */}
        <HospitalConditionsCard />

        {/* Botón de acción */}
        <View style={styles.actionContainer}>
          <Button
            title="Solicitar Viaje al Hospital (Inhabilitado)"
            variant="secondary"
            onPress={handleRequestTrip}
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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    color: '#94A3B8',
    fontSize: 13,
    marginBottom: 16,
  },
  actionContainer: {
    marginBottom: 40,
  },
});
