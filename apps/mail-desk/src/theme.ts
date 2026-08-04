import { useColorScheme } from "react-native"

export const palette = {
  navy: "#07111F",
  navySoft: "#101E31",
  gold: "#D8A83E",
  saffron: "#F26A21",
  ivory: "#FBF7EF",
  ink: "#152033",
  muted: "#748094",
  danger: "#D14B4B",
  success: "#2E8B69",
}

export function useSummitTheme() {
  const dark = useColorScheme() === "dark"
  return {
    dark,
    background: dark ? palette.navy : "#F4F0E8",
    surface: dark ? palette.navySoft : "#FFFFFF",
    surfaceAlt: dark ? "#18283D" : "#F8F3EA",
    text: dark ? "#F8F2E7" : palette.ink,
    muted: dark ? "#AAB4C2" : palette.muted,
    border: dark ? "#293B52" : "#E4DDD0",
  }
}
