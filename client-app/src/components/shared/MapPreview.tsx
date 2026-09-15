import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface MapPreviewProps {
  origin: string;
  destination: string;
  onSelectDestination: () => void;
}

export const MapPreview: React.FC<MapPreviewProps> = ({
  origin,
  destination,
  onSelectDestination,
}) => {
  return (
    <View style={styles.container}>
      {/* Vista previa del Mapa */}
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapText}>🗺️ Visor de Mapa Interactivo</Text>
        <Text style={styles.mapSubText}>Sentinel GPS Tracking Activo</Text>
      </View>

      {/* Selector de Origen y Destino */}
      <View style={styles.addressBox}>
        <View style={styles.row}>
          <Text style={styles.dotOrigin}>🟢</Text>
          <View style={styles.addressTextContainer}>
            <Text style={styles.label}>Origen</Text>
            <Text style={styles.addressText} numberOfLines={1}>{origin || 'Obteniendo GPS...'}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.row} onPress={onSelectDestination}>
          <Text style={styles.dotDest}>🔴</Text>
          <View style={styles.addressTextContainer}>
            <Text style={styles.label}>Destino</Text>
            <Text style={styles.addressText} numberOfLines={1}>
              {destination || '¿A dónde quieres ir?'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  mapPlaceholder: {
    height: 180,
    backgroundColor: '#1E293B',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#334155',
    borderWidth: 1,
    marginBottom: 12,
  },
  mapText: {
    color: '#38BDF8',
    fontWeight: 'bold',
    fontSize: 16,
  },
  mapSubText: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 4,
  },
  addressBox: {
    backgroundColor: '#1E293B',
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: '#334155',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dotOrigin: {
    fontSize: 12,
    marginRight: 10,
  },
  dotDest: {
    fontSize: 12,
    marginRight: 10,
  },
  addressTextContainer: {
    flex: 1,
  },
  label: {
    color: '#94A3B8',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  addressText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#334155',
    marginVertical: 10,
    marginLeft: 22,
  },
});
