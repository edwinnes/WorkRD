export interface KmTransaction {
  id: string;
  date: string;
  type: 'earned' | 'redeemed';
  amountKm: number;
  description: string;
}

export interface KmBankState {
  totalKmBank: number;
  totalKmTraveled: number;
  history: KmTransaction[];
}

// Lógica de cálculo: Por cada 10km recorridos, gana 1km en el Banco de KM.
export const calculateEarnedKm = (traveledKm: number): number => {
  return Math.floor(traveledKm / 10);
};

export const kmBankService = {
  // Datos iniciales de simulación del usuario
  getKmBankData: async (): Promise<KmBankState> => {
    return {
      totalKmBank: 15, // 15 km acumulados para canjear
      totalKmTraveled: 154, // 154 km totales recorridos en la app
      history: [
        {
          id: 'tx-1',
          date: '2026-09-10',
          type: 'earned',
          amountKm: 5,
          description: 'Viaje de 52 km (Punta Cana - Santo Domingo)',
        },
        {
          id: 'tx-2',
          date: '2026-09-02',
          type: 'earned',
          amountKm: 10,
          description: 'Acumulado por viajes urbanos (108 km)',
        },
      ],
    };
  },

  // Canjear saldo de kilómetros para un viaje
  redeemKm: async (amountKmToRedeem: number): Promise<{ success: boolean; message: string }> => {
    if (amountKmToRedeem <= 0) {
      return { success: false, message: 'La cantidad a canjear debe ser mayor a 0.' };
    }
    return {
      success: true,
      message: `¡Has canjeado ${amountKmToRedeem} km con éxito para tu próximo viaje!`,
    };
  },
};
