export interface LocationCoords {
  latitude: number;
  longitude: number;
  address?: string;
}

export const locationService = {
  // Obtener la ubicación actual del usuario
  getCurrentLocation: async (): Promise<LocationCoords> => {
    try {
      // Coordenadas por defecto (Santo Domingo, RD)
      return {
        latitude: 18.4861,
        longitude: -69.9312,
        address: 'Santo Domingo, República Dominicana',
      };
    } catch (error) {
      console.warn('Error obteniendo ubicación GPS:', error);
      return {
        latitude: 18.4861,
        longitude: -69.9312,
        address: 'Ubicación Predeterminada',
      };
    }
  },

  // Simulación de búsqueda de direcciones por texto
  searchAddress: async (query: string): Promise<LocationCoords[]> => {
    if (!query) return [];
    return [
      {
        latitude: 18.4839,
        longitude: -69.9295,
        address: `${query}, Ensanche Naco, Santo Domingo`,
      },
      {
        latitude: 18.4655,
        longitude: -69.9310,
        address: `${query}, Piantini, Santo Domingo`,
      },
    ];
  }
};
