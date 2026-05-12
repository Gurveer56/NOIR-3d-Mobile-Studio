import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Pressable,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Settings, SlidersHorizontal } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import ShirtCard from '../../components/ShirtCard';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import { SHIRTS } from '../../constants/shirts';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - Spacing.lg * 2 - Spacing.md) / 2;

export default function HomeScreen() {
  const [search, setSearch] = useState('');

  const filteredShirts = SHIRTS.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.brand.toLowerCase().includes(search.toLowerCase())
  );

  const renderHeader = useCallback(() => (
    <View style={styles.headerContent}>
      <View>
        <Animated.Text
          entering={FadeInDown.duration(400).delay(100)}
          style={styles.greeting}
        >
          Welcome back
        </Animated.Text>
        <Animated.Text
          entering={FadeInDown.duration(400).delay(200)}
          style={styles.title}
        >
          NOIR
        </Animated.Text>
      </View>
      <Pressable
        style={styles.settingsButton}
        hitSlop={12}
      >
        <Settings color={Colors.white} size={20} strokeWidth={1.5} />
      </Pressable>
    </View>
  ), []);

  const renderSearch = useCallback(() => (
    <Animated.View
      entering={FadeInDown.duration(400).delay(300)}
      style={styles.searchContainer}
    >
      <Search color={Colors.gray400} size={18} strokeWidth={1.5} />
      <TextInput
        style={styles.searchInput}
        placeholder="Search shirts..."
        placeholderTextColor={Colors.gray500}
        value={search}
        onChangeText={setSearch}
      />
      <Pressable style={styles.filterButton} hitSlop={8}>
        <SlidersHorizontal color={Colors.gray400} size={16} strokeWidth={1.5} />
      </Pressable>
    </Animated.View>
  ), [search]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="light" />
      {renderHeader()}
      {renderSearch()}
      <FlatList
        data={filteredShirts}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <ShirtCard shirt={item} index={index} cardWidth={CARD_WIDTH} />
        )}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={styles.footerSpacer} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
  },
  greeting: {
    ...Typography.caption,
    color: Colors.gray400,
    fontFamily: 'Inter-Regular',
  },
  title: {
    ...Typography.h1,
    color: Colors.white,
    fontFamily: 'Inter-Bold',
    letterSpacing: 4,
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.gray800,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    paddingHorizontal: Spacing.md,
    height: 48,
    backgroundColor: Colors.gray800,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    gap: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    ...Typography.body,
    color: Colors.white,
    fontFamily: 'Inter-Regular',
    paddingVertical: 0,
  },
  filterButton: {
    padding: Spacing.xs,
  },
  row: {
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  list: {
    gap: Spacing.md,
  },
  footerSpacer: {
    height: Spacing.xxl,
  },
});
