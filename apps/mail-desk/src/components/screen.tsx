import type { PropsWithChildren } from "react"
import { SafeAreaView, StyleSheet, View, type StyleProp, type ViewStyle } from "react-native"

import { useSummitTheme } from "@/theme"

export function Screen({ children, style }: PropsWithChildren<{ style?: StyleProp<ViewStyle> }>) {
  const theme = useSummitTheme()
  return <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }, style]}>{children}</SafeAreaView>
}

export function Card({ children, style }: PropsWithChildren<{ style?: StyleProp<ViewStyle> }>) {
  const theme = useSummitTheme()
  return <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }, style]}>{children}</View>
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  card: { borderWidth: StyleSheet.hairlineWidth, borderRadius: 18, padding: 16 },
})
