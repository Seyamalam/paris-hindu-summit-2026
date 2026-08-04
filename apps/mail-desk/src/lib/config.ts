export const CONVEX_URL = process.env.EXPO_PUBLIC_CONVEX_URL ?? ""
export const CONVEX_SITE_URL = process.env.EXPO_PUBLIC_CONVEX_SITE_URL ?? ""
export const SITE_URL = process.env.EXPO_PUBLIC_SITE_URL ?? "https://www.parishindusummit.org"

export function assertConfiguration() {
  if (!CONVEX_URL || !CONVEX_SITE_URL) {
    throw new Error("Set EXPO_PUBLIC_CONVEX_URL and EXPO_PUBLIC_CONVEX_SITE_URL before starting the app.")
  }
}
