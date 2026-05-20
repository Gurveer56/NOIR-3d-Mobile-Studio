import React, { useRef, useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Animated, { FadeInDown, SlideInUp } from 'react-native-reanimated';
import { ArrowLeft, Check, Minus, Plus, RotateCcw, Star } from 'lucide-react-native';
import ModelViewer, { ModelViewerHandle } from '../../components/ModelViewer';
import { BorderRadius, Spacing, Typography } from '../../constants/theme';
import { SHIRTS } from '../../constants/shirts';
import { useAppTheme } from '../../hooks/useAppTheme';

export default function ProductDetailScreen() {
  const router = useRouter();
  const { colors } = useAppTheme();
  const { width } = useWindowDimensions();
  const { id } = useLocalSearchParams<{ id: string }>();
  const viewerRef = useRef<ModelViewerHandle>(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const shirt = SHIRTS.find((item) => item.id === id);

  if (!shirt) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.gray400 }]}>Product not found.</Text>
      </SafeAreaView>
    );
  }

  const handleOrder = () => {
    setOrderPlaced(true);
    Alert.alert('Order confirmed', `${shirt.name} has been added to your order queue.`);
    setTimeout(() => setOrderPlaced(false), 2500);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.navBar}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={12}
          style={[
            styles.navButton,
            {
              backgroundColor: colors.panel,
              borderColor: colors.cardBorder,
            },
          ]}
        >
          <ArrowLeft color={colors.gray100} size={20} strokeWidth={1.8} />
        </Pressable>
        <Text style={[styles.navTitle, { color: colors.gray100 }]}>{shirt.name}</Text>
        <View style={styles.navSpacer} />
      </View>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={[styles.modelSection, { height: Math.min(width * 0.96, 440) }]}>
          <View
            style={[
              styles.viewerShell,
              {
                backgroundColor: colors.panel,
                borderColor: colors.cardBorder,
              },
            ]}
          >
            <View style={[styles.viewerGlow, { backgroundColor: colors.heroGlow }]} />
            <ModelViewer ref={viewerRef} modelAsset={shirt.modelAsset} interactive style={styles.fullModel} />

            <View style={styles.viewerHud}>
              <View
                style={[
                  styles.hudPill,
                  {
                    backgroundColor: colors.overlay,
                    borderColor: colors.cardBorder,
                  },
                ]}
              >
                <RotateCcw color={colors.accent} size={14} strokeWidth={1.7} />
                <Text style={[styles.hudText, { color: colors.gray100 }]}>Drag to rotate</Text>
              </View>

              <View style={styles.zoomControls}>
                <Pressable
                  style={[
                    styles.zoomButton,
                    {
                      backgroundColor: colors.overlay,
                      borderColor: colors.cardBorder,
                    },
                  ]}
                  onPress={() => viewerRef.current?.zoomOut()}
                >
                  <Minus color={colors.gray100} size={16} strokeWidth={2.2} />
                </Pressable>
                <Pressable
                  style={[
                    styles.zoomButton,
                    {
                      backgroundColor: colors.overlay,
                      borderColor: colors.cardBorder,
                    },
                  ]}
                  onPress={() => viewerRef.current?.zoomIn()}
                >
                  <Plus color={colors.gray100} size={16} strokeWidth={2.2} />
                </Pressable>
                <Pressable
                  style={[
                    styles.resetButton,
                    {
                      backgroundColor: colors.accentMuted,
                      borderColor: colors.accent,
                    },
                  ]}
                  onPress={() => viewerRef.current?.resetView()}
                >
                  <Text style={[styles.resetButtonText, { color: colors.accent }]}>Reset</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>

        <Animated.View entering={FadeInDown.duration(420).delay(70)} style={styles.productInfo}>
          <View
            style={[
              styles.headerCard,
              {
                backgroundColor: colors.panel,
                borderColor: colors.cardBorder,
              },
            ]}
          >
            <View style={styles.brandRow}>
              <Text style={[styles.brand, { color: colors.accent }]}>{shirt.brand}</Text>
              <View style={styles.ratingContainer}>
                <Star color={colors.warning} size={14} strokeWidth={1.5} fill={colors.warning} />
                <Text style={[styles.ratingValue, { color: colors.gray100 }]}>{shirt.rating}</Text>
                <Text style={[styles.reviewCount, { color: colors.gray400 }]}>
                  ({shirt.reviews} reviews)
                </Text>
              </View>
            </View>

            <Text style={[styles.productName, { color: colors.gray100 }]}>{shirt.name}</Text>
            <Text style={[styles.price, { color: colors.gray200 }]}>${shirt.price}</Text>

            <View style={styles.featureRow}>
              <View
                style={[
                  styles.featurePill,
                  {
                    backgroundColor: colors.panelRaised,
                    borderColor: colors.subtleBorder,
                  },
                ]}
              >
                <Text style={[styles.featureLabel, { color: colors.gray300 }]}>
                  Studio light locked to camera
                </Text>
              </View>
              <View
                style={[
                  styles.featurePill,
                  {
                    backgroundColor: colors.panelRaised,
                    borderColor: colors.subtleBorder,
                  },
                ]}
              >
                <Text style={[styles.featureLabel, { color: colors.gray300 }]}>
                  Pinch plus button zoom
                </Text>
              </View>
            </View>
          </View>

          <View
            style={[
              styles.detailCard,
              {
                backgroundColor: colors.panel,
                borderColor: colors.cardBorder,
              },
            ]}
          >
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.gray400 }]}>Description</Text>
              <Text style={[styles.sectionBody, { color: colors.gray200 }]}>{shirt.description}</Text>
            </View>

            <View style={[styles.divider, { backgroundColor: colors.subtleBorder }]} />

            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.gray400 }]}>Material</Text>
              <Text style={[styles.sectionBody, { color: colors.gray200 }]}>{shirt.fibre}</Text>
            </View>

            <View style={[styles.divider, { backgroundColor: colors.subtleBorder }]} />

            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.gray400 }]}>Maker</Text>
              <Text style={[styles.sectionBody, { color: colors.gray200 }]}>{shirt.company}</Text>
            </View>
          </View>

          <View style={styles.bottomSpacer} />
        </Animated.View>
      </ScrollView>

      <View style={[styles.bottomBar, { backgroundColor: colors.background }]}>
        {orderPlaced ? (
          <Animated.View
            entering={SlideInUp.duration(280)}
            style={[
              styles.successContainer,
              {
                backgroundColor: colors.panel,
                borderColor: colors.cardBorder,
              },
            ]}
          >
            <Check color={colors.accent} size={18} strokeWidth={2.2} />
            <Text style={[styles.successText, { color: colors.gray100 }]}>
              Order confirmed successfully
            </Text>
          </Animated.View>
        ) : (
          <Pressable style={[styles.orderButton, { backgroundColor: colors.accent }]} onPress={handleOrder}>
            <Text style={[styles.orderButtonText, { color: colors.black }]}>Confirm Order</Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  navButton: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  navTitle: {
    ...Typography.h3,
    fontFamily: 'Inter-SemiBold',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: Spacing.md,
  },
  navSpacer: {
    width: 44,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 116,
  },
  modelSection: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
  },
  viewerShell: {
    flex: 1,
    borderRadius: BorderRadius.xxl,
    overflow: 'hidden',
    borderWidth: 1,
  },
  viewerGlow: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: BorderRadius.full,
    top: -40,
    right: -30,
    zIndex: 0,
  },
  fullModel: {
    flex: 1,
  },
  viewerHud: {
    position: 'absolute',
    right: Spacing.md,
    bottom: Spacing.md,
    left: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  hudPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.md,
    height: 38,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  hudText: {
    ...Typography.micro,
    fontFamily: 'Inter-SemiBold',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  zoomControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  zoomButton: {
    width: 38,
    height: 38,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  resetButton: {
    paddingHorizontal: Spacing.md,
    height: 38,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  resetButtonText: {
    ...Typography.micro,
    fontFamily: 'Inter-SemiBold',
    letterSpacing: 0.9,
    textTransform: 'uppercase',
  },
  productInfo: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    gap: Spacing.md,
  },
  headerCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    borderWidth: 1,
  },
  brandRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    gap: Spacing.sm,
  },
  brand: {
    ...Typography.micro,
    fontFamily: 'Inter-SemiBold',
    letterSpacing: 1.8,
    textTransform: 'uppercase',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingValue: {
    ...Typography.label,
    fontFamily: 'Inter-SemiBold',
  },
  reviewCount: {
    ...Typography.micro,
    fontFamily: 'Inter-Medium',
  },
  productName: {
    ...Typography.h1,
    fontFamily: 'Inter-Bold',
  },
  price: {
    ...Typography.h2,
    fontFamily: 'Inter-SemiBold',
    marginTop: Spacing.xs,
  },
  featureRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.lg,
    flexWrap: 'wrap',
  },
  featurePill: {
    height: 34,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    justifyContent: 'center',
  },
  featureLabel: {
    ...Typography.micro,
    fontFamily: 'Inter-SemiBold',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  detailCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    borderWidth: 1,
  },
  divider: {
    height: 1,
    marginVertical: Spacing.lg,
  },
  section: {
    gap: Spacing.sm,
  },
  sectionTitle: {
    ...Typography.label,
    fontFamily: 'Inter-SemiBold',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  sectionBody: {
    ...Typography.body,
    fontFamily: 'Inter-Regular',
  },
  bottomSpacer: {
    height: Spacing.xxl,
  },
  bottomBar: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
    paddingTop: Spacing.md,
  },
  orderButton: {
    height: 56,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderButtonText: {
    ...Typography.h3,
    fontFamily: 'Inter-SemiBold',
  },
  successContainer: {
    height: 56,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  successText: {
    ...Typography.body,
    fontFamily: 'Inter-SemiBold',
  },
  errorText: {
    ...Typography.body,
    textAlign: 'center',
    marginTop: Spacing.xxl,
  },
});
