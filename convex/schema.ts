import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  resumes: defineTable({
    title: v.string(),
    markdown: v.string(),
    css: v.string(),
    createdBy: v.string(),
  })
    .index("created_by_idx", ["createdBy", "_creationTime"])
    .searchIndex("resume_search_idx", {
      searchField: "title",
      filterFields: ["_creationTime", "createdBy"],
    }),
});
