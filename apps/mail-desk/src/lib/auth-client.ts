import { expoClient } from "@better-auth/expo/client"
import { convexClient } from "@convex-dev/better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"
import * as SecureStore from "expo-secure-store"

import { CONVEX_SITE_URL } from "@/lib/config"

export const authClient = createAuthClient({
  baseURL: CONVEX_SITE_URL,
  plugins: [
    expoClient({
      scheme: "parishindusummitmail",
      storagePrefix: "summit-mail",
      storage: SecureStore,
    }) as never,
    convexClient(),
  ],
})
