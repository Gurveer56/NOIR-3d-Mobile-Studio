import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Moon, Bell, Shield, ChevronRight, LogOut, Globe, Palette } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';

interface SettingItemProps {
  icon: React.ReactNode;
  label: string;
  value?: string;
  toggle?: boolean;
  toggleValue?: boolean;
  onToggle?: () => void;
  onPress?: () => void;
  showChevron?: boolean;
  last?: boolean;
}

function SettingItem({ icon, label, value, toggle, toggleValue, onToggle, onPress, showChevron, last }: SettingItemProps) {
  return (
    <Pressable
      style={[styles.settingItem, last && styles.settingItemLast]}
      onPress={onPress}
      disabled={!onPress && !toggle}
    >
      <View style={styles.settingLeft}>
        <View style={styles.settingIcon}>{icon}</View>
        <Text style={styles.settingLabel}>{label}</Text>
      </View>
      <View style={styles.settingRight}>
        {value && <Text style={styles.settingValue}>{value}</Text>}
        {toggle && (
          <Switch
            value={toggleValue}
            onValueChange={onToggle}
            trackColor={{ false: Colors.gray700, true: Colors.gray400 }}
            thumbColor={toggleValue ? Colors.white : Colors.gray500}
          />
        )}
        {showChevron && <ChevronRight color={Colors.gray600} size={18} strokeWidth={1.5} />}
      </View>
    </Pressable>
  );
}

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Animated.View entering={FadeInDown.duration(400).delay(100)} style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(400).delay(200)}>
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Appearance</Text>
          <View style={styles.sectionCard}>
            <SettingItem
              icon={<Moon color={Colors.gray300} size={18} strokeWidth={1.5} />}
              label="Dark Mode"
              toggle
              toggleValue={darkMode}
              onToggle={() => setDarkMode(!darkMode)}
            />
            <SettingItem
              icon={<Palette color={Colors.gray300} size={18} strokeWidth={1.5} />}
              label="Theme"
              value="Black & White"
              showChevron
              last
            />
          </View>
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(400).delay(300)}>
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>General</Text>
          <View style={styles.sectionCard}>
            <SettingItem
              icon={<Bell color={Colors.gray300} size={18} strokeWidth={1.5} />}
              label="Notifications"
              toggle
              toggleValue={notifications}
              onToggle={() => setNotifications(!notifications)}
            />
            <SettingItem
              icon={<Globe color={Colors.gray300} size={18} strokeWidth={1.5} />}
              label="Language"
              value="English"
              showChevron
            />
            <SettingItem
              icon={<Shield color={Colors.gray300} size={18} strokeWidth={1.5} />}
              label="Privacy"
              showChevron
              last
            />
          </View>
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(400).delay(400)}>
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Account</Text>
          <View style={styles.sectionCard}>
            <SettingItem
              icon={<LogOut color={Colors.gray300} size={18} strokeWidth={1.5} />}
              label="Sign Out"
              showChevron
              last
            />
          </View>
        </View>
      </Animated.View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>NOIR v1.0.0</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.lg,
  },
  title: {
    ...Typography.h1,
    color: Colors.white,
    fontFamily: 'Inter-Bold',
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionLabel: {
    ...Typography.micro,
    color: Colors.gray500,
    fontFamily: 'Inter-Medium',
    letterSpacing: 2,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  sectionCard: {
    backgroundColor: Colors.gray800,
    marginHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.subtleBorder,
  },
  settingItemLast: {
    borderBottomWidth: 0,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  settingIcon: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.gray700,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingLabel: {
    ...Typography.body,
    color: Colors.white,
    fontFamily: 'Inter-Regular',
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  settingValue: {
    ...Typography.caption,
    color: Colors.gray400,
    fontFamily: 'Inter-Regular',
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
    paddingBottom: Spacing.xl,
  },
  footerText: {
    ...Typography.micro,
    color: Colors.gray600,
    fontFamily: 'Inter-Medium',
    letterSpacing: 1,
  },
});
