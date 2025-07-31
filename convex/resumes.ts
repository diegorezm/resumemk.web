import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createResume = mutation({
  args: {
    title: v.string(),
    markdown: v.string(),
    css: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new Error("Unauthorized");
    }

    const existingCount = await ctx.db
      .query("resumes")
      .withIndex("created_by_idx", (q) =>
        q.eq("createdBy", user.tokenIdentifier),
      )
      .collect();

    if (existingCount.length >= 10) {
      throw new Error("Resume limit reached (max 10).");
    }

    return await ctx.db.insert("resumes", {
      title: args.title,
      markdown: args.markdown,
      css: args.css,
      createdBy: user.tokenIdentifier,
    });
  },
});

export const getMyResumes = query({
  args: {
    orderBy: v.optional(v.union(v.literal("asc"), v.literal("desc"))),
    search: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new Error("Unauthorized");
    }
    const { orderBy, search } = args;

    let q = search
      ? ctx.db
          .query("resumes")
          .withSearchIndex("resume_search_idx", (q) =>
            q.search("title", search).eq("createdBy", user.tokenIdentifier),
          )
      : ctx.db
          .query("resumes")
          .withIndex("created_by_idx", (q) =>
            q.eq("createdBy", user.tokenIdentifier),
          )
          .order(orderBy ?? "desc");
    return await q.collect();
  },
});

export const getResume = query({
  args: { id: v.id("resumes") },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new Error("Unauthorized");
    }

    const resume = await ctx.db.get(args.id);
    if (!resume || resume.createdBy !== user.tokenIdentifier) {
      throw new Error("Not found");
    }

    return resume;
  },
});

export const updateResume = mutation({
  args: {
    id: v.id("resumes"),
    title: v.optional(v.string()),
    markdown: v.optional(v.string()),
    css: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new Error("Unauthorized");

    const resume = await ctx.db.get(args.id);
    if (!resume || resume.createdBy !== user.tokenIdentifier) {
      throw new Error("Not found");
    }

    await ctx.db.patch(args.id, {
      title: args.title ?? resume.title,
      markdown: args.markdown ?? resume.markdown,
      css: args.css ?? resume.css,
    });

    return true;
  },
});

export const deleteResume = mutation({
  args: { id: v.id("resumes") },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new Error("Unauthorized");

    const resume = await ctx.db.get(args.id);
    if (!resume || resume.createdBy !== user.tokenIdentifier) {
      throw new Error("Not found");
    }

    await ctx.db.delete(args.id);
    return true;
  },
});
