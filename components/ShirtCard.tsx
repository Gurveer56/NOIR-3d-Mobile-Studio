import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Star } from 'lucide-react-native';
import ModelViewer from './ModelViewer';
import { BorderRadius, Spacing, Typography } from '../constants/theme';
import { useAppTheme } from '../hooks/useAppTheme';
import { Shirt } from '../constants/shirts';

interface ShirtCardProps {
  shirt: Shirt;
  index: number;
  onPress?: (shirt: Shirt) => void;
}

export default function ShirtCard({ shirt, index, onPress }: ShirtCardProps) {
  const { colors } = useAppTheme();

  return (
    <Animated.View
      entering={FadeInDown.duration(420).delay(index * 60)}
      style={styles.container}
    >
      <Pressable
        onPress={() => onPress?.(shirt)}
        style={({ pressed }) => [
          styles.card,
          {
            backgroundColor: colors.panel,
            borderColor: colors.cardBorder,
            opacity: pressed ? 0.94 : 1,
          },
        ]}
      >
        <View style={styles.info}>
          <View style={styles.metaRow}>
            <Text style={[styles.brand, { color: colors.gray400 }]}>{shirt.brand}</Text>
            <View style={[styles.ratingBadge, { backgroundColor: colors.panelSoft }]}>
              <Star color={colors.warning} size={11} strokeWidth={1.5} fill={colors.warning} />
              <Text style={[styles.ratingText, { color: colors.gray100 }]}>{shirt.rating}</Text>
            </View>
          </View>

          <Text style={[styles.name, { color: colors.gray100 }]} numberOfLines={1}>
            {shirt.name}
          </Text>

          <Text style={[styles.description, { color: colors.gray400 }]} numberOfLines={2}>
            {shirt.description}
          </Text>

          <View style={styles.footerRow}>
            <View style={styles.priceColumn}>
              <Text style={[styles.price, { color: colors.gray100 }]}>${shirt.price}</Text>
              <Text style={[styles.secondaryText, { color: colors.gray500 }]} numberOfLines={1}>
                {shirt.fibre}
              </Text>
            </View>

            <View
              pointerEvents="none"
              style={[
                styles.previewShell,
                {
                  backgroundColor: colors.panelRaised,
                  borderColor: colors.cardBorder,
                },
              ]}
            >
              <ModelViewer
                modelAsset={shirt.modelAsset}
                interactive={false}
                autoRotate
                style={styles.previewViewer}
              />
              <View style={[styles.previewBadge, { backgroundColor: colors.overlay }]}>
                <Text style={[styles.previewText, { color: colors.accent }]}>3D Preview</Text>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
    width: '100%',
  },
  card: {
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    overflow: 'hidden',
    minHeight: 168,
  },
  info: {
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  brand: {
    ...Typography.micro,
    fontFamily: 'Inter-SemiBold',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    flexShrink: 1,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  ratingText: {
    ...Typography.micro,
    fontFamily: 'Inter-SemiBold',
  },
  name: {
    ...Typography.h3,
    fontFamily: 'Inter-SemiBold',
  },
  description: {
    ...Typography.caption,
    fontFamily: 'Inter-Regular',
    minHeight: 36,
  },
  footerRow: {
    marginTop: Spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  priceColumn: {
    flex: 1,
    minWidth: 0,
  },
  previewShell: {
    width: 116,
    height: 84,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    flexShrink: 0,
  },
  previewViewer: {
    flex: 1,
  },
  previewBadge: {
    position: 'absolute',
    right: 6,
    bottom: 6,
    left: 6,
    borderRadius: BorderRadius.md,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  previewText: {
    ...Typography.micro,
    fontFamily: 'Inter-SemiBold',
    letterSpacing: 0.9,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  price: {
    ...Typography.h3,
    fontFamily: 'Inter-Bold',
  },
  secondaryText: {
    ...Typography.micro,
    fontFamily: 'Inter-Medium',
    marginTop: 2,
  },
});
