import React from 'react';
import { Button, View, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme.js';

export const ThemeSwitcher = () => {
  const { toggleTheme } = useTheme();
  
  return (
    <View style={styles.container}>
      <Button title="Light" onPress={() => toggleTheme()} />
      <Button title="Dark" onPress={() => toggleTheme()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 10,
  }
});