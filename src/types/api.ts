import type { RouterInputs, RouterOutputs } from "@/utils/trpc";

export type FansRouterInputs = RouterInputs["fans"];
export type WaitlistRouterInputs = RouterInputs["waitlist"];

export type FansRouterOutputs = RouterOutputs["fans"];
export type WaitlistRouterOutputs = RouterOutputs["waitlist"];
