import { io, Socket } from 'socket.io-client';
import appCredentials from '../config/appCredentials.json';

export interface LocationPoint {
  lat: number;
  lng: number;
  address: string;
}

export interface ClientProfilePayload {
  userId: string;
  name: string;
  phone: string;
}

export interface GoogleRouteMetrics {
  distanceKm: number;
  durationMinutes: number;
  origin: LocationPoint;
  destination: LocationPoint;
}

export interface LiveFareQuoteResponse {
  tripId: string;
  category: string;
  estimatedPrice: number;
  currency: string;
  distanceKm: number;
  durationMinutes: number;
  responseTimeMs: number;
}

class CentralBackendService {
  private socket: Socket | null = null;

  // Conexión enviando credenciales de app + token de usuario
  public connectWithCredentials(deviceToken: string, userId: string, onConnected?: () => void) {
    if (this.socket && this.socket.connected) return;

    this.socket = io(appCredentials.socket_url, {
      transports: ['websocket'],
      auth: {
        app_id: appCredentials.app_id,
        client_secret: appCredentials.client_secret,
        device_token: deviceToken,
      },
      query: { userId },
      reconnectionDelay: 500,
    });

    this.socket.on('connect', () => {
      console.log('⚡ Conexión autenticada con el Panel Central');
      if (onConnected) onConnected();
    });
  }

  public async getGoogleRouteMetrics(
    origin: LocationPoint,
    destination: LocationPoint
  ): Promise<GoogleRouteMetrics> {
    return {
      distanceKm: 8.7,
      durationMinutes: 19,
      origin,
      destination,
    };
  }

  public requestLiveQuoteViaSocket(payload: {
    client: ClientProfilePayload;
    metrics: GoogleRouteMetrics;
    category: string;
  }) {
    if (this.socket && this.socket.connected) {
      this.socket.emit('client:request_live_fare', payload);
    }
  }

  public onLiveQuoteReceived(callback: (quote: LiveFareQuoteResponse) => void) {
    if (this.socket) {
      this.socket.off('server:live_fare_response');
      this.socket.on('server:live_fare_response', callback);
    }
  }

  public confirmTripWithPanel(tripId: string, clientData: ClientProfilePayload) {
    if (this.socket) {
      this.socket.emit('client:confirm_trip', { tripId, client: clientData });
    }
  }

  public onDriverAssigned(callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on('server:driver_assigned', callback);
    }
  }

  public onDriverLocationUpdate(callback: (location: { lat: number; lng: number }) => void) {
    if (this.socket) {
      this.socket.on('server:driver_location', callback);
    }
  }
}

export const centralBackendService = new CentralBackendService();
