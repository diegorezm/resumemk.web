import { ConvexError } from "convex/values";
import type { MutationCtx, QueryCtx } from "./_generated/server";

export async function getUserOrThrow(ctx: QueryCtx) {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
        throw new ConvexError({
            message: "Unauthorized",
            severity: "high",
        });
    }
    return user;
}
