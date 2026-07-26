import { v } from "convex/values"

import { mutation, query } from "./_generated/server"
import { getAdmin, writeAudit } from "./lib/admin"

const status = v.union(v.literal("draft"), v.literal("published"))
const seriesFields = {
  slug: v.string(), title: v.string(), eyebrow: v.string(), description: v.string(),
  sourceLabel: v.string(), sourceUrl: v.string(), unit: v.string(), order: v.number(), status,
}
const pointFields = { seriesSlug: v.string(), label: v.string(), sublabel: v.string(), value: v.number(), order: v.number() }

export const listPublished = query({
  args: {},
  returns: v.array(v.object({ _id: v.id("chartSeries"), ...seriesFields, points: v.array(v.object({ _id: v.id("chartPoints"), ...pointFields })) })),
  handler: async (ctx) => {
    const series = await ctx.db.query("chartSeries").withIndex("by_status_and_order", (q) => q.eq("status", "published")).take(10)
    return await Promise.all(series.map(async (item) => {
      const points = await ctx.db.query("chartPoints").withIndex("by_series_slug_and_order", (q) => q.eq("seriesSlug", item.slug)).take(100)
      return {
        _id: item._id, slug: item.slug, title: item.title, eyebrow: item.eyebrow, description: item.description,
        sourceLabel: item.sourceLabel, sourceUrl: item.sourceUrl, unit: item.unit, order: item.order, status: item.status,
        points: points.map(({ _id, seriesSlug, label, sublabel, value, order }) => ({ _id, seriesSlug, label, sublabel, value, order })),
      }
    }))
  },
})

export const listForAdmin = query({
  args: {},
  returns: v.object({
    series: v.array(v.object({ _id: v.id("chartSeries"), ...seriesFields })),
    points: v.array(v.object({ _id: v.id("chartPoints"), ...pointFields })),
  }),
  handler: async (ctx) => {
    await getAdmin(ctx)
    const series = await ctx.db.query("chartSeries").withIndex("by_status_and_order").take(20)
    const points = await ctx.db.query("chartPoints").withIndex("by_series_slug_and_order").take(300)
    return {
      series: series.map(({ _id, slug, title, eyebrow, description, sourceLabel, sourceUrl, unit, order, status }) => ({ _id, slug, title, eyebrow, description, sourceLabel, sourceUrl, unit, order, status })),
      points: points.map(({ _id, seriesSlug, label, sublabel, value, order }) => ({ _id, seriesSlug, label, sublabel, value, order })),
    }
  },
})

export const saveSeries = mutation({
  args: { id: v.optional(v.id("chartSeries")), ...seriesFields },
  returns: v.id("chartSeries"),
  handler: async (ctx, args) => { const actor = await getAdmin(ctx); const { id, ...fields } = args; const entityId = id ? (await ctx.db.patch(id, { ...fields, updatedAt: Date.now() }), id) : await ctx.db.insert("chartSeries", { ...fields, updatedAt: Date.now() }); await writeAudit(ctx, actor, { action: id ? "update" : "create", entityType: "chartSeries", entityId, summary: `Saved ${fields.title}` }); return entityId },
})
export const savePoint = mutation({
  args: { id: v.optional(v.id("chartPoints")), ...pointFields },
  returns: v.id("chartPoints"),
  handler: async (ctx, args) => { const actor = await getAdmin(ctx); const { id, ...fields } = args; if (!Number.isFinite(fields.value) || fields.value < 0) throw new Error("Chart values must be positive numbers."); const entityId = id ? (await ctx.db.patch(id, { ...fields, updatedAt: Date.now() }), id) : await ctx.db.insert("chartPoints", { ...fields, updatedAt: Date.now() }); await writeAudit(ctx, actor, { action: id ? "update" : "create", entityType: "chartPoint", entityId, summary: `Saved ${fields.label}` }); return entityId },
})
export const removeSeries = mutation({
  args: { id: v.id("chartSeries") }, returns: v.null(),
  handler: async (ctx, args) => { const actor = await getAdmin(ctx); const row = await ctx.db.get(args.id); if (row) await ctx.db.delete(args.id); await writeAudit(ctx, actor, { action: "delete", entityType: "chartSeries", entityId: args.id, summary: `Deleted ${row?.title ?? "series"}` }); return null },
})
export const removePoint = mutation({
  args: { id: v.id("chartPoints") }, returns: v.null(),
  handler: async (ctx, args) => { const actor = await getAdmin(ctx); const row = await ctx.db.get(args.id); if (row) await ctx.db.delete(args.id); await writeAudit(ctx, actor, { action: "delete", entityType: "chartPoint", entityId: args.id, summary: `Deleted ${row?.label ?? "point"}` }); return null },
})
