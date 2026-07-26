import { createClient, type GenericCtx } from "@convex-dev/better-auth"
import { convex } from "@convex-dev/better-auth/plugins"
import { betterAuth } from "better-auth/minimal"
import { v } from "convex/values"

import { components } from "./_generated/api"
import type { DataModel } from "./_generated/dataModel"
import { query } from "./_generated/server"
import authConfig from "./auth.config"

const siteUrl = process.env.SITE_URL!

export const authComponent = createClient<DataModel>(components.betterAuth)

export const createAuth = (ctx: GenericCtx<DataModel>) =>
  betterAuth({
    baseURL: siteUrl,
    database: authComponent.adapter(ctx),
    trustedOrigins: [siteUrl],
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
      minPasswordLength: 10,
    },
    plugins: [convex({ authConfig })],
  })

export const getCurrentUser = query({
  args: {},
  returns: v.union(
    v.null(),
    v.object({
      id: v.string(),
      name: v.string(),
      email: v.string(),
      image: v.union(v.string(), v.null()),
    })
  ),
  handler: async (ctx) => {
    const user = await authComponent.safeGetAuthUser(ctx)
    if (!user) return null
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      image: user.image ?? null,
    }
  },
})
