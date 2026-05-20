import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { LegendList } from '@legendapp/list';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MoonStar, Search, SunMedium } from 'lucide-react-native';
import ShirtCard from '../../components/ShirtCard';
import { BorderRadius, Spacing, Typography } from '../../constants/theme';
import { SHIRTS } from '../../constants/shirts';
import { useAppTheme } from '../../hooks/useAppTheme';

export default function HomeScreen() {
  const router = useRouter();
  const { colors, isDark, toggleTheme } = useAppTheme();
  const [search, setSearch] = useState('');

  const filteredShirts = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) {
      return SHIRTS;
    }

    return SHIRTS.filter(
      (shirt) =>
        shirt.name.toLowerCase().includes(term) ||
        shirt.brand.toLowerCase().includes(term) ||
        shirt.fibre.toLowerCase().includes(term)
    );
  }, [search]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      <View style={styles.header}>
        <View
          style={[
            styles.searchBox,
            {
              backgroundColor: colors.panel,
              borderColor: colors.cardBorder,
            },
          ]}
        >
          <Search color={colors.gray400} size={18} strokeWidth={1.8} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search shirts"
            placeholderTextColor={colors.gray500}
            style={[styles.searchInput, { color: colors.gray100 }]}
          />
        </View>

        <Pressable
          onPress={toggleTheme}
          hitSlop={10}
          style={[
            styles.themeButton,
            {
              backgroundColor: colors.panel,
              borderColor: colors.cardBorder,
            },
          ]}
        >
          {isDark ? (
            <SunMedium color={colors.gray100} size={19} strokeWidth={1.8} />
          ) : (
            <MoonStar color={colors.gray100} size={19} strokeWidth={1.8} />
          )}
        </Pressable>
      </View>

      <LegendList
        data={filteredShirts}
        estimatedItemSize={326}
        recycleItems
        style={styles.list}
        contentContainerStyle={styles.listContent}
        keyExtractor={(shirt) => shirt.id}
        renderItem={({ item, index }) => (
          <ShirtCard
            shirt={item}
            index={index}
            onPress={(selected) => router.push(`/product/${selected.id}`)}
          />
        )}
        ListFooterComponent={<View style={styles.footerSpacer} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: 112,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    marginBottom: Spacing.md,
  },
  searchBox: {
    flex: 1,
    height: 50,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    paddingHorizontal: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    ...Typography.body,
    fontFamily: 'Inter-Regular',
    paddingVertical: 0,
  },
  themeButton: {
    width: 50,
    height: 50,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerSpacer: {
    height: Spacing.lg,
  },
});
