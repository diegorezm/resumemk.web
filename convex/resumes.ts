import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getCurrentUserOrThrow } from "./users";
import { createError } from "./errors";

const MAX_RESUMES = 2;
const MAX_CHARACTERS = 100_000;

export const createResume = mutation({
  args: {
    title: v.string(),
    markdown: v.string(),
    css: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);

    const existingCount = await ctx.db
      .query("resumes")
      .withIndex("created_by_idx", (q) => q.eq("createdBy", user._id))
      .collect();

    if (user.role && user.role !== "staff") {
      if (existingCount.length >= MAX_RESUMES) {
        throw createError({
          code: "LimitExceeded",
          message: `Resume limit reached (max ${MAX_RESUMES}). Get the pro plan to unlock unlimited resumes.`,
          severity: "medium",
        });
      }
    }

    const totalCharacters =
      args.title.length + args.markdown.length + args.css.length;

    if (totalCharacters > MAX_CHARACTERS) {
      throw createError({
        code: "ContentTooLong",
        message: `Resume content too long (limit is ${MAX_CHARACTERS} characters).`,
        severity: "medium",
      });
    }

    return await ctx.db.insert("resumes", {
      title: args.title,
      markdown: args.markdown,
      css: args.css,
      createdBy: user._id,
    });
  },
});

export const getMyResumes = query({
  args: {
    orderBy: v.optional(v.union(v.literal("asc"), v.literal("desc"))),
    search: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);
    const { orderBy, search } = args;

    const q = search
      ? ctx.db
          .query("resumes")
          .withSearchIndex("resume_search_idx", (q) =>
            q.search("title", search).eq("createdBy", user._id),
          )
      : ctx.db
          .query("resumes")
          .withIndex("created_by_idx", (q) => q.eq("createdBy", user._id))
          .order(orderBy ?? "desc");

    return await q.collect();
  },
});

export const getResume = query({
  args: { id: v.optional(v.id("resumes")) },
  handler: async (ctx, args) => {
    const { id } = args;
    if (!id) {
      throw createError({
        code: "BadRequest",
        message: "No 'id' provided",
        severity: "high",
      });
    }
    const user = await getCurrentUserOrThrow(ctx);

    const resume = await ctx.db.get(id);
    if (!resume || resume.createdBy !== user._id) {
      throw createError({
        code: "NotFound",
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
    const user = await getCurrentUserOrThrow(ctx);

    const resume = await ctx.db.get(args.id);
    if (!resume || resume.createdBy !== user._id) {
      throw createError({
        code: "NotFound",
        message: "Resume not found or you don't have permission to edit it.",
        severity: "low",
      });
    }

    const totalCharacters =
      (args.title?.length ?? resume.title.length) +
      (args.markdown?.length ?? resume.markdown.length) +
      (args.css?.length ?? resume.css.length);

    if (totalCharacters > MAX_CHARACTERS) {
      throw createError({
        code: "ContentTooLong",
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
    const user = await getCurrentUserOrThrow(ctx);

    const resume = await ctx.db.get(args.id);
    if (!resume || resume.createdBy !== user._id) {
      throw createError({
        code: "NotFound",
        message: "Resume not found or you don't have permission to delete it.",
        severity: "low",
      });
    }

    await ctx.db.delete(args.id);
    return true;
  },
});
