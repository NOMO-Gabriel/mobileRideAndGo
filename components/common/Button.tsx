// components/common/Button.tsx
import React from 'react';
import { StyleSheet, View, Pressable, Text, ActivityIndicator } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';

type Props = {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  icon?: keyof typeof Ionicons.glyphMap;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  size?: 'small' | 'medium' | 'large';
};

export default function Button({
  label,
  onPress,
  variant = 'primary',
  icon,
  disabled = false,
  loading = false,
  fullWidth = false,
  size = 'medium',
}: Props) {
  const { colors } = useTheme();
  
  // Déterminez les styles en fonction de la variante
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          container: { backgroundColor: colors.primary },
          text: { color: '#FFFFFF' },
        };
      case 'secondary':
        return {
          container: { backgroundColor: colors.secondary },
          text: { color: '#FFFFFF' },
        };
      case 'outline':
        return {
          container: { 
            backgroundColor: 'transparent', 
            borderWidth: 2, 
            borderColor: colors.primary 
          },
          text: { color: colors.primary },
        };
      case 'text':
        return {
          container: { backgroundColor: 'transparent' },
          text: { color: colors.primary },
        };
    }
  };
  
  // Déterminez les styles en fonction de la taille
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          container: { height: 36, paddingHorizontal: 12 },
          text: { fontSize: 14 },
          icon: 18,
        };
      case 'medium':
        return {
          container: { height: 48, paddingHorizontal: 16 },
          text: { fontSize: 16 },
          icon: 20,
        };
      case 'large':
        return {
          container: { height: 56, paddingHorizontal: 20 },
          text: { fontSize: 18 },
          icon: 24,
        };
    }
  };
  
  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();
  
  return (
    <View
      style={[
        styles.buttonContainer,
        variantStyles.container,
        sizeStyles.container,
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
      ]}>
      <Pressable
        style={styles.button}
        onPress={onPress}
        disabled={disabled || loading}>
        {loading ? (
          <ActivityIndicator size="small" color={variantStyles.text.color} />
        ) : (
          <>
            {icon && (
              <Ionicons 
                name={icon} 
                size={sizeStyles.icon} 
                color={variantStyles.text.color} 
                style={styles.buttonIcon} 
              />
            )}
            <Text style={[styles.buttonLabel, variantStyles.text, sizeStyles.text]}>
              {label}
            </Text>
          </>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8
  },
});