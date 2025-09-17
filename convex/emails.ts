import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db
      .query("emails")
      .withIndex("by_createdAt")
      .order("desc")
      .collect();
    return rows.map((r) => ({
      id: r._id,
      email: r.email,
      createdAt: r.createdAt,
    }));
  },
});

export const add = mutation({
  args: { email: v.string() },
  handler: async (ctx, { email }) => {
    const exists = await ctx.db
      .query("emails")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();
    if (exists) return exists._id;
    return await ctx.db.insert("emails", { email, createdAt: Date.now() });
  },
});
