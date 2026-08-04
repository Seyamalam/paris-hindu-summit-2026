import { ConvexError } from "convex/values"

import { authComponent } from "../auth"
import type { MutationCtx, QueryCtx } from "../_generated/server"

export async function getAdmin(
  ctx: QueryCtx | MutationCtx,
  options: { allowMissing?: boolean } = {}
) {
  const user = await authComponent.safeGetAuthUser(ctx)
  if (!user) {
    if (options.allowMissing) return null
    throw new ConvexError("Sign in is required.")
  }

  const admin = await ctx.db
    .query("adminUsers")
    .withIndex("by_auth_user_id", (q) => q.eq("authUserId", user._id))
    .unique()

  if (!admin || admin.status !== "active") {
    if (options.allowMissing) return null
    throw new ConvexError("Administrator access is required.")
  }

  if (admin.role === "mail_manager") {
    if (options.allowMissing) return null
    throw new ConvexError("Editorial administrator access is required.")
  }

  return { user, admin }
}

export async function getMailOperator(ctx: QueryCtx | MutationCtx) {
  const user = await authComponent.safeGetAuthUser(ctx)
  if (!user) throw new ConvexError("Sign in is required.")

  const admin = await ctx.db
    .query("adminUsers")
    .withIndex("by_auth_user_id", (q) => q.eq("authUserId", user._id))
    .unique()

  if (
    !admin ||
    admin.status !== "active" ||
    (admin.role !== "administrator" && admin.role !== "mail_manager")
  ) {
    throw new ConvexError("Mail desk access is required.")
  }

  return { user, admin }
}

export async function writeAudit(
  ctx: MutationCtx,
  actor:
    | Awaited<ReturnType<typeof getAdmin>>
    | Awaited<ReturnType<typeof getMailOperator>>,
  event: {
    action: string
    entityType: string
    entityId: string
    summary: string
  }
) {
  if (!actor) return
  await ctx.db.insert("auditEvents", {
    actorId: actor.user._id,
    actorEmail: actor.user.email,
    ...event,
    createdAt: Date.now(),
  })
}
