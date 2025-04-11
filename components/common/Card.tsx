// components/common/Card.tsx
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  onPress?: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  elevated?: boolean;
  style?: any;
};

export default function Card({
  title,
  subtitle,
  children,
  onPress,
  icon,
  rightIcon,
  onRightIconPress,
  elevated = false,
  style,
}: Props) {
  const { colors } = useTheme();

  const CardComponent = onPress ? TouchableOpacity : View;

  return (
    <CardComponent
      style={[
        styles.card,
        { 
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
        elevated && { 
          shadowColor: colors.text,
          elevation: 3,
        },
        style
      ]}
      onPress={onPress}
    >
      {(title || icon) && (
        <View style={styles.header}>
          {icon && (
            <Ionicons name={icon} size={22} color={colors.primary} style={styles.icon} />
          )}
          <View style={styles.titleContainer}>
            {title && (
              <Text style={[styles.title, { color: colors.text }]}>
                {title}
              </Text>
            )}
            {subtitle && (
              <Text style={[styles.subtitle, { color: colors.text + 'CC' }]}>
                {subtitle}
              </Text>
            )}
          </View>
          {rightIcon && (
            <TouchableOpacity onPress={onRightIconPress} style={styles.rightIcon}>
              <Ionicons name={rightIcon} size={22} color={colors.primary} />
            </TouchableOpacity>
          )}
        </View>
      )}
      <View style={styles.content}>
        {children}
      </View>
    </CardComponent>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    marginVertical: 8,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
  },
  icon: {
    marginRight: 8,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  rightIcon: {
    padding: 4,
  },
  content: {
    padding: 12,
  },
});