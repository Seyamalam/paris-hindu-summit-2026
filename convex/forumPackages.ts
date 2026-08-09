import { v } from "convex/values"

import { internalMutation } from "./_generated/server"
import { forumPackageItems } from "./forumPackageData"

export const replaceWithCurrentPackages = internalMutation({
  args: {},
  returns: v.object({ packages: v.number() }),
  handler: async (ctx) => {
    const existing = await ctx.db
      .query("cmsEntries")
      .withIndex("by_category_and_order", (q) => q.eq("category", "forumPackage"))
      .collect()
    await Promise.all(existing.map((item) => ctx.db.delete(item._id)))
    const updatedAt = Date.now()
    for (const item of forumPackageItems) {
      await ctx.db.insert("cmsEntries", {
        category:"forumPackage",
        slug:item.slug,
        title:item.title,
        eyebrow:item.parentSlug === "accommodation" ? "Accommodation" : "Partnership & Sponsorship",
        summary:item.summary,
        body:item.body,
        secondaryText:item.secondaryText,
        country:"",
        role:"",
        email:"",
        phone:"",
        linkLabel:"",
        linkUrl:"",
        dateLabel:item.price,
        timeLabel:"",
        parentSlug:item.parentSlug,
        order:item.order,
        status:"published",
        featured:false,
        updatedAt,
      })
    }
    return { packages:forumPackageItems.length }
  },
})
