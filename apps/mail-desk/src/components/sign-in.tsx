import { Image } from "expo-image"
import { useState } from "react"
import { ActivityIndicator, StyleSheet, Text, TextInput, View } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-controller"

import { NativeButton } from "@/components/native-button"
import { Screen } from "@/components/screen"
import { authClient } from "@/lib/auth-client"
import { palette, useSummitTheme } from "@/theme"

export function SignIn() {
  const theme = useSummitTheme()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")

  async function submit() {
    setBusy(true)
    setError("")
    const result = await authClient.signIn.email({ email: email.trim(), password })
    if (result.error) setError(result.error.message || "Sign-in failed. Check your email and password.")
    setBusy(false)
  }

  return (
    <Screen>
        <KeyboardAwareScrollView
          bottomOffset={62}
          contentContainerStyle={styles.center}
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
        >
        <Image
          // Static asset references are resolved by Metro at build time.
          source={require("../../assets/images/summit-logo.png")}
          style={styles.logo}
          contentFit="contain"
          accessibilityLabel="Paris Hindu Summit logo"
        />
        <Text style={[styles.eyebrow, { color: palette.gold }]}>PARIS HINDU SUMMIT 2026</Text>
        <Text style={[styles.title, { color: theme.text }]}>Mail Desk</Text>
        <Text style={[styles.subtitle, { color: theme.muted }]}>A private workspace for summit correspondence.</Text>
        <View style={styles.form}>
          <TextInput autoCapitalize="none" autoComplete="email" keyboardType="email-address" placeholder="Email" placeholderTextColor={theme.muted} value={email} onChangeText={setEmail} style={[styles.input, { color: theme.text, backgroundColor: theme.surface, borderColor: theme.border }]} />
          <TextInput autoCapitalize="none" autoComplete="current-password" placeholder="Password" placeholderTextColor={theme.muted} secureTextEntry value={password} onChangeText={setPassword} onSubmitEditing={submit} style={[styles.input, { color: theme.text, backgroundColor: theme.surface, borderColor: theme.border }]} />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          {busy ? <ActivityIndicator color={palette.gold} /> : <NativeButton label="Sign in securely" onPress={submit} disabled={!email || !password} />}
        </View>
        </KeyboardAwareScrollView>
    </Screen>
  )
}

const styles = StyleSheet.create({
  center: { flexGrow: 1, justifyContent: "center", padding: 28 }, logo: { width: 92, height: 92, alignSelf: "center", marginBottom: 22 },
  eyebrow: { textAlign: "center", fontSize: 12, fontWeight: "800", letterSpacing: 2 }, title: { fontSize: 38, fontWeight: "800", textAlign: "center", marginTop: 8 },
  subtitle: { textAlign: "center", fontSize: 16, marginTop: 8, marginBottom: 30 }, form: { gap: 12 },
  input: { minHeight: 54, borderWidth: 1, borderRadius: 14, paddingHorizontal: 16, fontSize: 16 }, error: { color: palette.danger, lineHeight: 20 },
})
