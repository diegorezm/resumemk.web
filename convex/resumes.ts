import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

const MAX_RESUMES = 2;
const MAX_CHARACTERS = 100_000;

export const createResume = mutation({
  args: {
    title: v.string(),
    markdown: v.string(),
    css: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError({
        message: "Unauthorized",
        severity: "high",
      });
    }

    const existingCount = await ctx.db
      .query("resumes")
      .withIndex("created_by_idx", (q) =>
        q.eq("createdBy", user.tokenIdentifier),
      )
      .collect();

    if (existingCount.length >= MAX_RESUMES) {
      throw new ConvexError({
        message: `Resume limit reached (max ${MAX_RESUMES}).`,
        severity: "medium",
      });
    }

    const totalCharacters =
      args.title.length + args.markdown.length + args.css.length;
    if (totalCharacters > MAX_CHARACTERS) {
      throw new ConvexError({
        message: `Resume content too long (limit is ${MAX_CHARACTERS} characters).`,
        severity: "medium",
      });
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
      throw new ConvexError({
        message: "Unauthorized",
        severity: "high",
      });
    }

    const { orderBy, search } = args;

    const q = search
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
      throw new ConvexError({
        message: "Unauthorized",
        severity: "high",
      });
    }

    const resume = await ctx.db.get(args.id);
    if (!resume || resume.createdBy !== user.tokenIdentifier) {
      throw new ConvexError({
        message: "Resume not found",
        severity: "low",
      });
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
    if (!user) {
      throw new ConvexError({
        message: "Unauthorized",
        severity: "high",
      });
    }

    const resume = await ctx.db.get(args.id);
    if (!resume || resume.createdBy !== user.tokenIdentifier) {
      throw new ConvexError({
        message: "Resume not found",
        severity: "low",
      });
    }

    const totalCharacters =
      (args.title?.length ?? resume.title.length) +
      (args.markdown?.length ?? resume.markdown.length) +
      (args.css?.length ?? resume.css.length);

    if (totalCharacters > MAX_CHARACTERS) {
      throw new ConvexError({
        message: `Resume content too long (limit is ${MAX_CHARACTERS} characters).`,
        severity: "medium",
      });
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
    if (!user) {
      throw new ConvexError({
        message: "Unauthorized",
        severity: "high",
      });
    }

    const resume = await ctx.db.get(args.id);
    if (!resume || resume.createdBy !== user.tokenIdentifier) {
      throw new ConvexError({
        message: "Resume not found",
        severity: "low",
      });
    }

    await ctx.db.delete(args.id);
    return true;
  },
});
