export type ThemeMode = 'light' | 'dark';

export interface ThemePalette {
  black: string;
  white: string;
  background: string;
  panel: string;
  panelRaised: string;
  panelSoft: string;
  gray900: string;
  gray800: string;
  gray700: string;
  gray600: string;
  gray500: string;
  gray400: string;
  gray300: string;
  gray200: string;
  gray100: string;
  gray50: string;
  accent: string;
  accentStrong: string;
  accentMuted: string;
  warning: string;
  danger: string;
  overlay: string;
  cardBorder: string;
  subtleBorder: string;
  heroGlow: string;
}

const dark: ThemePalette = {
  black: '#06070A',
  white: '#FFFFFF',
  background: '#06070A',
  panel: '#10131A',
  panelRaised: '#161A22',
  panelSoft: '#1B202B',
  gray900: '#0D1016',
  gray800: '#151922',
  gray700: '#232937',
  gray600: '#384153',
  gray500: '#6A7386',
  gray400: '#9099AB',
  gray300: '#B4BBC8',
  gray200: '#D3D8E2',
  gray100: '#EBEEF4',
  gray50: '#F7F8FB',
  accent: '#6EE7C8',
  accentStrong: '#2CE0AF',
  accentMuted: 'rgba(110, 231, 200, 0.14)',
  warning: '#F4C36A',
  danger: '#FF7B72',
  overlay: 'rgba(3, 5, 10, 0.72)',
  cardBorder: 'rgba(255, 255, 255, 0.08)',
  subtleBorder: 'rgba(255, 255, 255, 0.06)',
  heroGlow: 'rgba(110, 231, 200, 0.24)',
};

const light: ThemePalette = {
  black: '#111827',
  white: '#FFFFFF',
  background: '#F4F6F8',
  panel: '#FFFFFF',
  panelRaised: '#FBFCFD',
  panelSoft: '#EEF2F6',
  gray900: '#DCE3EA',
  gray800: '#C9D3DE',
  gray700: '#A5B3C2',
  gray600: '#7B8796',
  gray500: '#64707F',
  gray400: '#4D5765',
  gray300: '#34404D',
  gray200: '#1F2937',
  gray100: '#111827',
  gray50: '#06070A',
  accent: '#0F9D86',
  accentStrong: '#087765',
  accentMuted: 'rgba(15, 157, 134, 0.12)',
  warning: '#D18A12',
  danger: '#D94C43',
  overlay: 'rgba(255, 255, 255, 0.82)',
  cardBorder: 'rgba(17, 24, 39, 0.08)',
  subtleBorder: 'rgba(17, 24, 39, 0.06)',
  heroGlow: 'rgba(15, 157, 134, 0.18)',
};

export const Themes: Record<ThemeMode, ThemePalette> = {
  dark,
  light,
};

export const Colors = Themes.dark;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const Typography = {
  hero: { fontSize: 34, fontWeight: '700' as const, lineHeight: 41 },
  h1: { fontSize: 28, fontWeight: '700' as const, lineHeight: 34 },
  h2: { fontSize: 22, fontWeight: '600' as const, lineHeight: 28 },
  h3: { fontSize: 18, fontWeight: '600' as const, lineHeight: 24 },
  body: { fontSize: 16, fontWeight: '400' as const, lineHeight: 24 },
  caption: { fontSize: 13, fontWeight: '400' as const, lineHeight: 18 },
  label: { fontSize: 12, fontWeight: '500' as const, lineHeight: 16 },
  micro: { fontSize: 10, fontWeight: '500' as const, lineHeight: 14 },
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  full: 9999,
};
