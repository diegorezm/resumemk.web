import { internalMutation, query, type QueryCtx } from "./_generated/server";
import type { UserJSON } from "@clerk/backend";
import { ConvexError, v, type Validator } from "convex/values";
import { createError } from "./errors";

export const current = query({
    args: {},
    handler: async (ctx) => {
        return await getCurrentUser(ctx);
    },
});

const ALLOWED_ROLES = ["user", "staff"] as const;
const ALLOWED_PLANS = ["free", "pro"] as const;

type Role = (typeof ALLOWED_ROLES)[number];
type Plan = (typeof ALLOWED_PLANS)[number];

export const upsertFromClerk = internalMutation({
    args: { data: v.any() as Validator<UserJSON> },
    async handler(ctx, { data }) {
        const metadata = data.public_metadata as {
            role?: unknown;
            plan?: unknown;
        };

        const rawRole = metadata?.role;
        const rawPlan = metadata?.plan;

        const role: Role = ALLOWED_ROLES.includes(rawRole as Role)
            ? (rawRole as Role)
            : "user";

        const plan: Plan = ALLOWED_PLANS.includes(rawPlan as Plan)
            ? (rawPlan as Plan)
            : "free";

        const userAttributes = {
            name: `${data.first_name} ${data.last_name}`,
            externalId: data.id,
            role,
            plan,
        };

        const user = await userByExternalId(ctx, data.id);
        if (user === null) {
            await ctx.db.insert("users", userAttributes);
        } else {
            await ctx.db.patch(user._id, userAttributes);
        }
    },
});

export const deleteFromClerk = internalMutation({
    args: { clerkUserId: v.string() },
    async handler(ctx, { clerkUserId }) {
        const user = await userByExternalId(ctx, clerkUserId);

        if (user !== null) {
            const resumes = await ctx.db
                .query("resumes")
                .withIndex("created_by_idx", (q) => q.eq("createdBy", user._id))
                .collect();

            for (const resume of resumes) {
                await ctx.db.delete(resume._id);
            }

            await ctx.db.delete(user._id);
        } else {
            console.warn(
                `Can't delete user, there is none for Clerk user ID: ${clerkUserId}`,
            );
        }
    },
});

export async function getCurrentUserOrThrow(ctx: QueryCtx) {
    const userRecord = await getCurrentUser(ctx);
    if (!userRecord) {
        throw createError({
            code: "Unauthorized",
            message: "Unauthorized",
            severity: "high",
        });
    }
    return userRecord;
}

export async function getCurrentUser(ctx: QueryCtx) {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
        return null;
    }
    return await userByExternalId(ctx, identity.subject);
}

async function userByExternalId(ctx: QueryCtx, externalId: string) {
    return await ctx.db
        .query("users")
        .withIndex("by_external_id", (q) => q.eq("externalId", externalId))
        .unique();
}
