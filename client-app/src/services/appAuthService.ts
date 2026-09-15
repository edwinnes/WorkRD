import appCredentials from '../config/appCredentials.json';

export interface DeviceUserRegistration {
  appId: string;
  deviceId: string;
  registeredUserToken: string;
  isRegisteredOnPanel: boolean;
}

class AppAuthService {
  private static TOKEN_KEY = 'NOSOTROS_RD_DEVICE_TOKEN';

  /**
   * Registra la app cliente en el Panel Central como un usuario activo y guarda el token.
   */
  public async registerAppClientOnPanel(userData?: { name?: string; phone?: string }): Promise<string | null> {
    try {
      const payload = {
        app_id: appCredentials.app_id,
        client_secret: appCredentials.client_secret,
        device_info: {
          platform: 'android',
          version: appCredentials.version,
        },
        user: {
          name: userData?.name || 'Usuario Pasajero',
          phone: userData?.phone || '8090000000',
        },
      };

      const response = await fetch(`${appCredentials.api_base_url}/v1/auth/register-client-device`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success && data.deviceToken) {
        console.log('✅ Aplicación registrada exitosamente en el Panel Central.');
        return data.deviceToken;
      }
    } catch (error) {
      console.warn('⚠️ No se pudo conectar con el Panel Central para el registro inicial, usando credencial local.');
    }

    // Token simulado de respaldo para desarrollo local
    return `dev-token-${appCredentials.app_id}-${Date.now()}`;
  }
}

export const appAuthService = new AppAuthService();
