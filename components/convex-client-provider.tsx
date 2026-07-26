"use client"

import {
  ConvexBetterAuthProvider,
  type AuthClient,
} from "@convex-dev/better-auth/react"
import { ConvexReactClient } from "convex/react"
import { useState } from "react"

import { authClient } from "@/lib/auth-client"

export function ConvexClientProvider({
  children,
  initialToken,
}: {
  children: React.ReactNode
  initialToken?: string | null
}) {
  const [client] = useState(
    () => new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!)
  )

  return (
    <ConvexBetterAuthProvider
      client={client}
      authClient={authClient as unknown as AuthClient}
      initialToken={initialToken}
    >
      {children}
    </ConvexBetterAuthProvider>
  )
}
