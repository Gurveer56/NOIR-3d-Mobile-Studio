import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Star, RotateCcw, Check } from 'lucide-react-native';
import Animated, { FadeInDown, FadeIn, SlideInUp } from 'react-native-reanimated';
import ModelViewer from '../../components/ModelViewer';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import { SHIRTS } from '../../constants/shirts';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const shirt = SHIRTS.find((s) => s.id === id);
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (!shirt) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Product not found</Text>
      </SafeAreaView>
    );
  }

  const handleOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => setOrderPlaced(false), 2500);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.navBar}>
        <Pressable onPress={() => router.back()} hitSlop={12} style={styles.navButton}>
          <ArrowLeft color={Colors.white} size={22} strokeWidth={1.5} />
        </Pressable>
        <Text style={styles.navTitle}>{shirt.name}</Text>
        <View style={styles.navButton} />
      </View>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.modelSection}>
          <ModelViewer
            modelAsset={shirt.modelAsset}
            interactive={true}
            style={styles.fullModel}
          />
          <View style={styles.interactHint}>
            <RotateCcw color={Colors.gray400} size={14} strokeWidth={1.5} />
            <Text style={styles.interactText}>Drag to rotate / Pinch to zoom</Text>
          </View>
        </View>

        <Animated.View
          entering={FadeInDown.duration(400).delay(100)}
          style={styles.productInfo}
        >
          <View style={styles.brandRow}>
            <Text style={styles.brand}>{shirt.brand}</Text>
            <View style={styles.ratingContainer}>
              <Star color={Colors.white} size={14} strokeWidth={1.5} fill={Colors.white} />
              <Text style={styles.ratingValue}>{shirt.rating}</Text>
              <Text style={styles.reviewCount}>({shirt.reviews})</Text>
            </View>
          </View>

          <Text style={styles.productName}>{shirt.name}</Text>
          <Text style={styles.price}>${shirt.price}</Text>

          <View style={styles.divider} />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.sectionBody}>{shirt.description}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Fibre</Text>
            <Text style={styles.sectionBody}>{shirt.fibre}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Company</Text>
            <Text style={styles.sectionBody}>{shirt.company}</Text>
          </View>

          <View style={styles.bottomSpacer} />
        </Animated.View>
      </ScrollView>

      <View style={styles.bottomBar}>
        {orderPlaced ? (
          <Animated.View
            entering={SlideInUp.duration(300)}
            style={styles.successContainer}
          >
            <Check color={Colors.white} size={18} strokeWidth={2} />
            <Text style={styles.successText}>Order confirmed successfully</Text>
          </Animated.View>
        ) : (
          <Pressable
            style={styles.orderButton}
            onPress={handleOrder}
          >
            <Text style={styles.orderButtonText}>Confirm Order</Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  navButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navTitle: {
    ...Typography.h3,
    color: Colors.white,
    fontFamily: 'Inter-SemiBold',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  modelSection: {
    height: SCREEN_WIDTH * 0.85,
    position: 'relative',
  },
  fullModel: {
    flex: 1,
  },
  interactHint: {
    position: 'absolute',
    bottom: Spacing.md,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  interactText: {
    ...Typography.micro,
    color: Colors.gray400,
    fontFamily: 'Inter-Medium',
  },
  productInfo: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
  },
  brandRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  brand: {
    ...Typography.micro,
    color: Colors.gray400,
    fontFamily: 'Inter-Medium',
    letterSpacing: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingValue: {
    ...Typography.label,
    color: Colors.white,
    fontFamily: 'Inter-Medium',
  },
  reviewCount: {
    ...Typography.micro,
    color: Colors.gray400,
    fontFamily: 'Inter-Regular',
  },
  productName: {
    ...Typography.h1,
    color: Colors.white,
    fontFamily: 'Inter-Bold',
    marginBottom: Spacing.xs,
  },
  price: {
    ...Typography.h2,
    color: Colors.gray200,
    fontFamily: 'Inter-SemiBold',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.subtleBorder,
    marginVertical: Spacing.lg,
  },
  section: {
    gap: Spacing.sm,
  },
  sectionTitle: {
    ...Typography.label,
    color: Colors.gray400,
    fontFamily: 'Inter-Medium',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  sectionBody: {
    ...Typography.body,
    color: Colors.gray200,
    fontFamily: 'Inter-Regular',
    lineHeight: 24,
  },
  bottomSpacer: {
    height: Spacing.xxl,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
    paddingTop: Spacing.md,
    backgroundColor: Colors.black,
  },
  orderButton: {
    backgroundColor: Colors.white,
    height: 54,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderButtonText: {
    ...Typography.h3,
    color: Colors.black,
    fontFamily: 'Inter-SemiBold',
  },
  successContainer: {
    backgroundColor: Colors.gray800,
    height: 54,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  successText: {
    ...Typography.body,
    color: Colors.white,
    fontFamily: 'Inter-SemiBold',
  },
  errorText: {
    ...Typography.body,
    color: Colors.gray400,
    textAlign: 'center',
    marginTop: Spacing.xxl,
  },
});
