import { AuthLoading, Authenticated, Unauthenticated } from "convex/react"
import type { PropsWithChildren } from "react"
import { ActivityIndicator, StyleSheet, View } from "react-native"

import { SignIn } from "@/components/sign-in"
import { palette } from "@/theme"

export function AuthenticatedScreen({ children }: PropsWithChildren) {
  return <><AuthLoading><View style={styles.loading}><ActivityIndicator color={palette.gold} size="large" /></View></AuthLoading><Unauthenticated><SignIn /></Unauthenticated><Authenticated>{children}</Authenticated></>
}

const styles = StyleSheet.create({ loading: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: palette.navy } })
