// ** Third-Party Imports
import { z } from "zod";

// ** Custom Components, Hooks, Utils, etc.
import { createTRPCRouter, publicProcedure } from "../trpc";

export const waitlistRouter = createTRPCRouter({
  add: publicProcedure
    .input(
      z.object({
        email: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.waitlist.create({
        data: {
          ...input,
          timestamp: new Date(),
        },
      });

      return {
        message: "Added to waitlist!",
      };
    }),
});
