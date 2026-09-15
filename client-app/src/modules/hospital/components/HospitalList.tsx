import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HospitalCardItem, Hospital } from './HospitalCardItem';

const HOSPITALS: Hospital[] = [
  { id: '1', name: 'Plaza de la Salud (HGPS)', address: 'Av. Ortega y Gasset, Santo Domingo', icon: '🏥' },
  { id: '2', name: 'Centro Médico CEDIMAT', address: 'Calle Pepillo Salcedo, Santo Domingo', icon: '🩺' },
  { id: '3', name: 'Hospital Metropolitano de Santiago (HOMS)', address: 'Autopista Duarte Km 2.8, Santiago', icon: '🏥' },
  { id: '4', name: 'Hospital Ney Arias Lora', address: 'Av. Charles de Gaulle, Santo Domingo Norte', icon: '🚑' },
  { id: '5', name: 'Clínica Abreu', address: 'Calle Beller #42, Santo Domingo', icon: '🏥' },
];

interface HospitalListProps {
  selectedHospital: Hospital | null;
  onSelectHospital: (hospital: Hospital) => void;
}

export const HospitalList: React.FC<HospitalListProps> = ({ selectedHospital, onSelectHospital }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Centros de Salud Disponibles</Text>
      {HOSPITALS.map((hospital) => (
        <HospitalCardItem
          key={hospital.id}
          hospital={hospital}
          isSelected={selectedHospital?.id === hospital.id}
          onSelect={onSelectHospital}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  header: {
    color: '#38BDF8',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 12,
  },
});
