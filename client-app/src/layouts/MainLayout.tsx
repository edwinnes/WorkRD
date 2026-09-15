import React from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { SecurityBanner } from '../components/shared/SecurityBanner';

interface MainLayoutProps {
  children: React.ReactNode;
  showSecurityBanner?: boolean;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, showSecurityBanner = true }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      <View style={styles.container}>
        {showSecurityBanner && <SecurityBanner />}
        <View style={styles.content}>{children}</View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  content: {
    flex: 1,
  },
});
