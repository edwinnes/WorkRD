import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'accent';
}

export const Button: React.FC<ButtonProps> = ({ title, onPress, variant = 'primary' }) => {
  const getBgColor = () => {
    switch (variant) {
      case 'accent': return '#E53E3E';
      case 'secondary': return '#2D3748';
      default: return '#3182CE';
    }
  };

  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: getBgColor() }]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 6,
  },
  text: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
