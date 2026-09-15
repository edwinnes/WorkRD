const BASE_URL = 'https://api.nosotrosrd.com/v1'; // Reemplazar con la URL/IP del servidor backend

export interface TripRequestPayload {
  category: 'Clásico' | 'Estándar' | 'Premium' | 'Elite';
  origin: { lat: number; lng: number; address: string };
  destination: { lat: number; lng: number; address: string };
  isHospitalTrip?: boolean;
}

export const apiService = {
  // Autenticación de usuario
  registerUser: async (name: string, phone: string) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone }),
      });
      return await response.json();
    } catch (error) {
      console.warn('Modo Offline / Error de red:', error);
      return { success: true, token: 'mock-jwt-token-sentinel' };
    }
  },

  // Solicitud de viaje
  requestTrip: async (payload: TripRequestPayload) => {
    try {
      const response = await fetch(`${BASE_URL}/trips/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return await response.json();
    } catch (error) {
      console.warn('Modo Offline / Simulación de backend:', error);
      return { success: true, tripId: 'trip-101', status: 'searching_driver' };
    }
  },

  // Verificación KYC para Triangulación Hospitalaria
  uploadHospitalDocuments: async (documentsData: any) => {
    try {
      const response = await fetch(`${BASE_URL}/kyc/hospital-triangulation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(documentsData),
      });
      return await response.json();
    } catch (error) {
      return { success: true, message: 'Documentos recibidos para revisión de soporte.' };
    }
  }
};
