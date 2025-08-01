import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  resumes: defineTable({
    title: v.string(),
    markdown: v.string(),
    css: v.string(),
    createdBy: v.id("users"),
  })
    .index("created_by_idx", ["createdBy"])
    .searchIndex("resume_search_idx", {
      searchField: "title",
      filterFields: ["_creationTime", "createdBy"],
    }),
  users: defineTable({
    externalId: v.string(),
    name: v.string(),
    role: v.optional(v.union(v.literal("staff"), v.literal("user"))),
    plan: v.optional(v.union(v.literal("free"), v.literal("pro"))),
  }).index("by_external_id", ["externalId"]),
});
