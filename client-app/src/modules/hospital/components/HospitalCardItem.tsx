import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

export interface Hospital {
  id: string;
  name: string;
  address: string;
  icon: string;
}

interface HospitalCardItemProps {
  hospital: Hospital;
  isSelected: boolean;
  onSelect: (hospital: Hospital) => void;
}

export const HospitalCardItem: React.FC<HospitalCardItemProps> = ({ hospital, isSelected, onSelect }) => {
  return (
    <TouchableOpacity
      style={[styles.card, isSelected && styles.selectedCard]}
      onPress={() => onSelect(hospital)}
    >
      <Text style={styles.icon}>{hospital.icon}</Text>
      <View style={styles.info}>
        <Text style={styles.name}>{hospital.name}</Text>
        <Text style={styles.address}>{hospital.address}</Text>
      </View>
      {isSelected && <Text style={styles.check}>✅</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E293B',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  selectedCard: {
    borderColor: '#38BDF8',
    backgroundColor: '#0F2744',
  },
  icon: {
    fontSize: 24,
    marginRight: 14,
  },
  info: {
    flex: 1,
  },
  name: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  address: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 2,
  },
  check: {
    fontSize: 16,
  },
});
