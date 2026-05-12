import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import ModelViewer from './ModelViewer';
import { Colors, Typography, BorderRadius, Spacing } from '../constants/theme';
import { Shirt } from '../constants/shirts';

interface ShirtCardProps {
  shirt: Shirt;
  index: number;
  cardWidth: number;
}

export default function ShirtCard({ shirt, index, cardWidth }: ShirtCardProps) {
  const router = useRouter();

  return (
    <Animated.View
      entering={FadeInDown.duration(400).delay(index * 80)}
      style={{ width: cardWidth }}
    >
      <Pressable
        style={styles.card}
        onPress={() => router.push(`/product/${shirt.id}`)}
      >
        <View style={styles.modelContainer}>
          <ModelViewer
            modelAsset={shirt.modelAsset}
            showSpeedControls={true}
            style={styles.modelViewer}
          />
        </View>
        <View style={styles.info}>
          <Text style={styles.brand}>{shirt.brand}</Text>
          <Text style={styles.name} numberOfLines={1}>{shirt.name}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>${shirt.price}</Text>
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>{shirt.rating}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.gray800,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  modelContainer: {
    height: 200,
  },
  modelViewer: {
    flex: 1,
  },
  info: {
    padding: Spacing.md,
    gap: 2,
  },
  brand: {
    ...Typography.micro,
    color: Colors.gray400,
    fontFamily: 'Inter-Medium',
    letterSpacing: 2,
  },
  name: {
    ...Typography.body,
    color: Colors.white,
    fontFamily: 'Inter-SemiBold',
    fontSize: 15,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.xs,
  },
  price: {
    ...Typography.caption,
    color: Colors.white,
    fontFamily: 'Inter-Regular',
  },
  ratingBadge: {
    backgroundColor: Colors.gray700,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  ratingText: {
    ...Typography.micro,
    color: Colors.gray200,
    fontFamily: 'Inter-Medium',
  },
});
