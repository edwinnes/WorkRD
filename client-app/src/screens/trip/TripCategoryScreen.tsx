import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { MainLayout } from '../../layouts/MainLayout';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { 
  centralBackendService, 
  GoogleRouteMetrics, 
  LiveFareQuoteResponse 
} from '../../services/centralBackendService';

const CATEGORIES = [
  { id: 'Clásico', name: 'Clásico', desc: 'Económico e ideal para el día a día', icon: '🚗' },
  { id: 'Estándar', name: 'Estándar', desc: 'Cómodo y con aire acondicionado', icon: '🚘' },
  { id: 'Premium', name: 'Premium', desc: 'Mayor confort y espacio superior', icon: '🚙' },
  { id: 'Elite', name: 'Elite', desc: 'Vehículos ejecutivos de alta gama', icon: '🏎️' },
];

export const TripCategoryScreen = ({ route, navigation }: any) => {
  const { user } = useAuth();
  const { origin, destination } = route.params || { 
    origin: 'Av. Winston Churchill, Santo Domingo', 
    destination: 'Plaza de la Salud, Santo Domingo' 
  };
  
  const [selectedCategory, setSelectedCategory] = useState<string>('Clásico');
  const [loadingRoute, setLoadingRoute] = useState<boolean>(true);
  const [googleMetrics, setGoogleMetrics] = useState<GoogleRouteMetrics | null>(null);
  const [currentQuote, setCurrentQuote] = useState<LiveFareQuoteResponse | null>(null);

  // 1. Inicializar conexión Socket y obtener métricas de Google Maps
  useEffect(() => {
    const clientId = user?.phone || 'client-guest';
    
    // Conexión persistente
    centralBackendService.connect(clientId, () => {
      // Escuchar respuestas de precios en vivo del Panel
      centralBackendService.onLiveQuoteReceived((quote) => {
        setCurrentQuote(quote);
      });
    });

    // Calcular distancia y tiempo real con Google Maps
    centralBackendService.getGoogleRouteMetrics(
      { lat: 18.4861, lng: -69.9312, address: origin },
      { lat: 18.4655, lng: -69.9310, address: destination }
    ).then((metrics) => {
      setGoogleMetrics(metrics);
      setLoadingRoute(false);
      // Emitir primer pedido de precio al conectar
      requestPrice(selectedCategory, metrics);
    });
  }, []);

  // 2. Al cambiar de categoría, emitir evento por WebSocket (Respuesta en milisegundos)
  useEffect(() => {
    if (googleMetrics) {
      requestPrice(selectedCategory, googleMetrics);
    }
  }, [selectedCategory]);

  const requestPrice = (category: string, metrics: GoogleRouteMetrics) => {
    centralBackendService.requestLiveQuoteViaSocket({
      client: {
        userId: user?.phone || 'client-guest',
        name: user?.name || 'Cliente Pasajero',
        phone: user?.phone || '809-000-0000',
      },
      metrics,
      category,
    });
  };

  const handleConfirmTrip = () => {
    if (!currentQuote) return;

    centralBackendService.confirmTripWithPanel(currentQuote.tripId, {
      userId: user?.phone || 'client-guest',
      name: user?.name || 'Cliente Pasajero',
      phone: user?.phone || '809-000-0000',
    });

    navigation.navigate('ActiveTrip', { quote: currentQuote });
  };

  return (
    <MainLayout showSecurityBanner={false}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Cotización Instantánea ⚡</Text>
        <Text style={styles.subtitle}>
          Ruta obtenida por Google Maps; precios cotizados en vivo por el Panel Central.
        </Text>

        {loadingRoute ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#38BDF8" />
            <Text style={styles.loadingText}>Conectando con Google Maps y Panel Central...</Text>
          </View>
        ) : (
          <>
            {googleMetrics && (
              <View style={styles.metricsBox}>
                <Text style={styles.metricsTitle}>📍 Métricas de Ruta (Google Maps):</Text>
                <Text style={styles.metricsText}>
                  • Distancia: <Text style={styles.highlight}>{googleMetrics.distanceKm} km</Text>
                  {'  |  '}
                  • Tiempo: <Text style={styles.highlight}>{googleMetrics.durationMinutes} mins</Text>
                </Text>
              </View>
            )}

            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <TouchableOpacity
                  key={cat.id}
                  style={[styles.categoryCard, isSelected && styles.selectedCategoryCard]}
                  onPress={() => setSelectedCategory(cat.id)}
                >
                  <Text style={styles.icon}>{cat.icon}</Text>
                  <View style={styles.info}>
                    <Text style={styles.categoryName}>{cat.name}</Text>
                    <Text style={styles.categoryDesc}>{cat.desc}</Text>
                  </View>

                  <View style={styles.priceContainer}>
                    <Text style={styles.priceText}>
                      {isSelected && currentQuote ? `RD$ ${currentQuote.estimatedPrice}` : 'Seleccionar'}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}

            {currentQuote && (
              <View style={styles.summaryBox}>
                <Text style={styles.summaryTitle}>Monto Autorizado por el Panel:</Text>
                <Text style={styles.summaryPrice}>Total: RD$ {currentQuote.estimatedPrice}</Text>
              </View>
            )}

            <View style={styles.actionContainer}>
              <Button 
                title="Confirmar y Solicitar Conductor" 
                onPress={handleConfirmTrip} 
              />
            </View>
          </>
        )}
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
  loadingBox: {
    padding: 30,
    alignItems: 'center',
  },
  loadingText: {
    color: '#38BDF8',
    marginTop: 12,
    fontSize: 14,
  },
  metricsBox: {
    backgroundColor: '#0F2744',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#38BDF8',
  },
  metricsTitle: {
    color: '#38BDF8',
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 2,
  },
  metricsText: {
    color: '#CBD5E1',
    fontSize: 12,
  },
  highlight: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  categoryCard: {
    backgroundColor: '#1E293B',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  selectedCategoryCard: {
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
  categoryName: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  categoryDesc: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 2,
  },
  priceContainer: {
    paddingLeft: 10,
  },
  priceText: {
    color: '#38BDF8',
    fontWeight: 'bold',
    fontSize: 16,
  },
  summaryBox: {
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 10,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  summaryTitle: {
    color: '#F8FAFC',
    fontWeight: 'bold',
    fontSize: 13,
    marginBottom: 4,
  },
  summaryPrice: {
    color: '#4ADE80',
    fontWeight: 'bold',
    fontSize: 20,
  },
  actionContainer: {
    marginBottom: 40,
  },
});
