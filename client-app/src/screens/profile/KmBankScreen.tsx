import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { MainLayout } from '../../layouts/MainLayout';
import { Button } from '../../components/ui/Button';
import { kmBankService, KmBankState } from '../../services/kmBankService';

export const KmBankScreen = () => {
  const [bankData, setBankData] = useState<KmBankState | null>(null);

  useEffect(() => {
    kmBankService.getKmBankData().then((data) => setBankData(data));
  }, []);

  const handleRedeem = () => {
    if (!bankData || bankData.totalKmBank <= 0) {
      Alert.alert('Saldo Insuficiente', 'Aún no tienes kilómetros acumulados para canjear.');
      return;
    }

    Alert.alert(
      'Canjear Kilómetros',
      `¿Deseas canjear tu saldo de ${bankData.totalKmBank} KM para un descuento en tu próximo viaje?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar Canje',
          onPress: async () => {
            const res = await kmBankService.redeemKm(bankData.totalKmBank);
            if (res.success) {
              Alert.alert('Éxito', res.message);
              setBankData((prev) =>
                prev ? { ...prev, totalKmBank: 0 } : null
              );
            }
          },
        },
      ]
    );
  };

  return (
    <MainLayout showSecurityBanner={false}>
      <View style={styles.container}>
        {/* Tarjeta de Saldo */}
        <View style={styles.cardBalance}>
          <Text style={styles.cardTitle}>Banco de Kilómetros 🚗</Text>
          <Text style={styles.balanceText}>
            {bankData ? bankData.totalKmBank : 0} <Text style={styles.unit}>KM</Text>
          </Text>
          <Text style={styles.ruleInfo}>
            💡 Recibes 1 KM acumulado en tu banco por cada 10 KM recorridos.
          </Text>
          <Text style={styles.traveledText}>
            Total recorrido: {bankData ? bankData.totalKmTraveled : 0} KM
          </Text>
        </View>

        {/* Acciones */}
        <Button title="Canjear KM en mi próximo viaje" onPress={handleRedeem} />

        {/* Historial */}
        <Text style={styles.sectionTitle}>Historial de Acumulación</Text>
        <FlatList
          data={bankData?.history || []}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.historyItem}>
              <View>
                <Text style={styles.historyDesc}>{item.description}</Text>
                <Text style={styles.historyDate}>{item.date}</Text>
              </View>
              <Text style={item.type === 'earned' ? styles.earnedKm : styles.redeemedKm}>
                {item.type === 'earned' ? `+${item.amountKm} KM` : `-${item.amountKm} KM`}
              </Text>
            </View>
          )}
        />
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
  cardBalance: {
    backgroundColor: '#1E293B',
    padding: 20,
    borderRadius: 12,
    borderColor: '#38BDF8',
    borderWidth: 1,
    marginBottom: 16,
  },
  cardTitle: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  balanceText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#38BDF8',
    marginVertical: 6,
  },
  unit: {
    fontSize: 20,
    color: '#F8FAFC',
  },
  ruleInfo: {
    color: '#CBD5E1',
    fontSize: 12,
    marginTop: 4,
  },
  traveledText: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 20,
    marginBottom: 12,
  },
  historyItem: {
    backgroundColor: '#1E293B',
    padding: 14,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  historyDesc: {
    color: '#F8FAFC',
    fontSize: 13,
    fontWeight: '500',
  },
  historyDate: {
    color: '#64748B',
    fontSize: 11,
    marginTop: 2,
  },
  earnedKm: {
    color: '#4ADE80',
    fontWeight: 'bold',
    fontSize: 15,
  },
  redeemedKm: {
    color: '#F87171',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
