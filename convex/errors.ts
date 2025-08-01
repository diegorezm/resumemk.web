import { ConvexError } from "convex/values";

export type ErrorSeverity = "low" | "medium" | "high";

export type ErrorCode =
    | "Unauthorized"
    | "NotFound"
    | "LimitExceeded"
    | "ContentTooLong"
    | "BadRequest"
    | "Unknown";

export interface AppErrorPayload {
    readonly code: ErrorCode;
    readonly message: string;
    readonly severity: ErrorSeverity;
}

export function createError(payload: AppErrorPayload) {
    return new ConvexError({
        ...payload,
    });
}
