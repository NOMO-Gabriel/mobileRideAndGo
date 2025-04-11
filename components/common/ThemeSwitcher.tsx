// components/ThemeSwitcher.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';

export const ThemeSwitcher = () => {
  const { theme, toggleTheme, setTheme, colors, isSystemTheme, useSystemTheme } = useTheme();
  
  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      {/* Option système */}
      <TouchableOpacity 
        style={[
          styles.option, 
          isSystemTheme && { backgroundColor: colors.primary }
        ]}
        onPress={useSystemTheme}
      >
        <Ionicons 
          name="phone-portrait-outline" 
          size={20} 
          color={isSystemTheme ? '#FFF' : colors.text} 
        />
        <Text style={[styles.text, { color: isSystemTheme ? '#FFF' : colors.text }]}>
          Système
        </Text>
      </TouchableOpacity>
      
      {/* Option claire */}
      <TouchableOpacity 
        style={[
          styles.option, 
          theme === 'light' && !isSystemTheme && { backgroundColor: colors.primary }
        ]}
        onPress={() => setTheme('light')}
      >
        <Ionicons 
          name="sunny-outline" 
          size={20} 
          color={theme === 'light' && !isSystemTheme ? '#FFF' : colors.text} 
        />
        <Text style={[
          styles.text, 
          { color: theme === 'light' && !isSystemTheme ? '#FFF' : colors.text }
        ]}>
          Clair
        </Text>
      </TouchableOpacity>
      
      {/* Option sombre */}
      <TouchableOpacity 
        style={[
          styles.option, 
          theme === 'dark' && !isSystemTheme && { backgroundColor: colors.primary }
        ]}
        onPress={() => setTheme('dark')}
      >
        <Ionicons 
          name="moon-outline" 
          size={20} 
          color={theme === 'dark' && !isSystemTheme ? '#FFF' : colors.text} 
        />
        <Text style={[
          styles.text, 
          { color: theme === 'dark' && !isSystemTheme ? '#FFF' : colors.text }
        ]}>
          Sombre
        </Text>
      </TouchableOpacity>
      
      {/* Switch rapide */}
      <View style={styles.switchContainer}>
        <Text style={[styles.switchText, { color: colors.text }]}>
          {theme === 'light' ? 'Clair' : 'Sombre'}
        </Text>
        <Switch
          value={theme === 'dark'}
          onValueChange={toggleTheme}
          trackColor={{ false: '#767577', true: colors.primaryLight }}
          thumbColor={colors.primary}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 12,
    margin: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  switchText: {
    fontSize: 16,
  }
});