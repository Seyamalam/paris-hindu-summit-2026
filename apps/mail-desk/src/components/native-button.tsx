import { Button, Host } from "@expo/ui"
import type { ComponentProps } from "react"
import { StyleSheet } from "react-native"

type Props = ComponentProps<typeof Button> & { compact?: boolean }

export function NativeButton({ compact, ...props }: Props) {
  return (
    <Host matchContents style={compact ? styles.compact : styles.host} seedColor="#D8A83E">
      <Button {...props} />
    </Host>
  )
}

const styles = StyleSheet.create({ host: { minHeight: 48 }, compact: { minHeight: 38 } })
