import { v } from "convex/values"

import { internalMutation, mutation, query } from "./_generated/server"
import { getAdmin, writeAudit } from "./lib/admin"

const status = v.union(v.literal("draft"), v.literal("published"))
const dayFields = {
  slug: v.string(),
  tabLabel: v.string(),
  navigationLabel: v.string(),
  dateLabel: v.string(),
  summary: v.string(),
  order: v.number(),
  status,
}
const sessionFields = {
  daySlug: v.string(),
  slug: v.string(),
  startTime: v.string(),
  endTime: v.string(),
  title: v.string(),
  description: v.string(),
  tag: v.string(),
  speakers: v.string(),
  location: v.string(),
  order: v.number(),
  status,
}

export const listPublished = query({
  args: {},
  returns: v.array(v.object({
    _id: v.id("programmeDays"),
    ...dayFields,
    sessions: v.array(v.object({ _id: v.id("programmeSessions"), ...sessionFields })),
  })),
  handler: async (ctx) => {
    const days = await ctx.db.query("programmeDays").withIndex("by_status_and_order", (q) => q.eq("status", "published")).take(10)
    return await Promise.all(days.map(async (day) => {
      const sessions = await ctx.db.query("programmeSessions").withIndex("by_day_slug_and_status_and_order", (q) => q.eq("daySlug", day.slug).eq("status", "published")).take(50)
      return {
        _id: day._id, slug: day.slug, tabLabel: day.tabLabel, navigationLabel: day.navigationLabel,
        dateLabel: day.dateLabel, summary: day.summary, order: day.order, status: day.status,
        sessions: sessions.map((item) => ({
          _id: item._id, daySlug: item.daySlug, slug: item.slug, startTime: item.startTime,
          endTime: item.endTime, title: item.title, description: item.description, tag: item.tag,
          speakers: item.speakers, location: item.location, order: item.order, status: item.status,
        })),
      }
    }))
  },
})

export const listForAdmin = query({
  args: {},
  returns: v.object({
    days: v.array(v.object({ _id: v.id("programmeDays"), ...dayFields })),
    sessions: v.array(v.object({ _id: v.id("programmeSessions"), ...sessionFields })),
  }),
  handler: async (ctx) => {
    await getAdmin(ctx)
    const days = await ctx.db.query("programmeDays").withIndex("by_status_and_order").take(20)
    const sessions = await ctx.db.query("programmeSessions").withIndex("by_day_slug_and_order").take(200)
    return {
      days: days.map(({ _id, slug, tabLabel, navigationLabel, dateLabel, summary, order, status }) => ({ _id, slug, tabLabel, navigationLabel, dateLabel, summary, order, status })),
      sessions: sessions.map(({ _id, daySlug, slug, startTime, endTime, title, description, tag, speakers, location, order, status }) => ({ _id, daySlug, slug, startTime, endTime, title, description, tag, speakers, location, order, status })),
    }
  },
})

export const saveDay = mutation({
  args: { id: v.optional(v.id("programmeDays")), ...dayFields },
  returns: v.id("programmeDays"),
  handler: async (ctx, args) => {
    const actor = await getAdmin(ctx)
    const { id, ...fields } = args
    const entityId = id ? (await ctx.db.patch(id, { ...fields, updatedAt: Date.now() }), id) : await ctx.db.insert("programmeDays", { ...fields, updatedAt: Date.now() })
    await writeAudit(ctx, actor, { action: id ? "update" : "create", entityType: "programmeDay", entityId, summary: `Saved ${fields.tabLabel}` })
    return entityId
  },
})

export const saveSession = mutation({
  args: { id: v.optional(v.id("programmeSessions")), ...sessionFields },
  returns: v.id("programmeSessions"),
  handler: async (ctx, args) => {
    const actor = await getAdmin(ctx)
    const { id, ...fields } = args
    const entityId = id ? (await ctx.db.patch(id, { ...fields, updatedAt: Date.now() }), id) : await ctx.db.insert("programmeSessions", { ...fields, updatedAt: Date.now() })
    await writeAudit(ctx, actor, { action: id ? "update" : "create", entityType: "programmeSession", entityId, summary: `Saved ${fields.title}` })
    return entityId
  },
})

export const publishAllDrafts = mutation({
  args: {},
  returns: v.object({ daysPublished: v.number(), sessionsPublished: v.number() }),
  handler: async (ctx) => {
    const actor = await getAdmin(ctx)
    const [days, sessions] = await Promise.all([
      ctx.db.query("programmeDays").withIndex("by_status_and_order", (q) => q.eq("status", "draft")).take(50),
      ctx.db.query("programmeSessions").withIndex("by_day_slug_and_order").take(500),
    ])
    const draftSessions = sessions.filter((session) => session.status === "draft")
    await Promise.all([
      ...days.map((day) => ctx.db.patch(day._id, { status:"published", updatedAt:Date.now() })),
      ...draftSessions.map((session) => ctx.db.patch(session._id, { status:"published", updatedAt:Date.now() })),
    ])
    await writeAudit(ctx, actor, {
      action: "publish",
      entityType: "programme",
      entityId: "all-drafts",
      summary: `Published ${days.length} programme days and ${draftSessions.length} sessions`,
    })
    return { daysPublished:days.length, sessionsPublished:draftSessions.length }
  },
})

export const repairPreparedProgramme = internalMutation({
  args: {},
  returns: v.object({ emptySessionsRemoved: v.number(), sessionsPublished: v.number() }),
  handler: async (ctx) => {
    const sessions = await ctx.db
      .query("programmeSessions")
      .withIndex("by_day_slug_and_order")
      .take(500)
    const emptySessions = sessions.filter((session) =>
      session.title.trim() === "" &&
      session.slug.trim() === "" &&
      session.startTime.trim() === "" &&
      session.endTime.trim() === "" &&
      session.description.trim() === ""
    )
    const preparedDrafts = sessions.filter((session) =>
      session.status === "draft" && session.title.trim() !== ""
    )
    await Promise.all([
      ...emptySessions.map((session) => ctx.db.delete(session._id)),
      ...preparedDrafts.map((session) => ctx.db.patch(session._id, {
        status:"published",
        updatedAt:Date.now(),
      })),
    ])
    return {
      emptySessionsRemoved:emptySessions.length,
      sessionsPublished:preparedDrafts.length,
    }
  },
})

export const removeDay = mutation({
  args: { id: v.id("programmeDays") },
  returns: v.null(),
  handler: async (ctx, args) => { const actor = await getAdmin(ctx); const row = await ctx.db.get(args.id); if (row) await ctx.db.delete(args.id); await writeAudit(ctx, actor, { action: "delete", entityType: "programmeDay", entityId: args.id, summary: `Deleted ${row?.tabLabel ?? "day"}` }); return null },
})

export const removeSession = mutation({
  args: { id: v.id("programmeSessions") },
  returns: v.null(),
  handler: async (ctx, args) => { const actor = await getAdmin(ctx); const row = await ctx.db.get(args.id); if (row) await ctx.db.delete(args.id); await writeAudit(ctx, actor, { action: "delete", entityType: "programmeSession", entityId: args.id, summary: `Deleted ${row?.title ?? "session"}` }); return null },
})
