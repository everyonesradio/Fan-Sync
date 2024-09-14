// ** Third-Party Imports
import { TRPCError } from "@trpc/server";
import { z } from "zod";

// ** Custom Components, Hooks, Utils, etc.
import { createTRPCRouter, publicProcedure } from "../trpc";

export const fansRouter = createTRPCRouter({
  get: publicProcedure
    .input(
      z.object({
        uuid: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const fanData = await ctx.prisma.fan.findUnique({
        where: {
          uuid: input.uuid
        },
      });

      return fanData;
    }),

  create: publicProcedure
    .input(
      z.object({
        uuid: z.string(),
        profilePicture: z.string(),
        dob: z.string(),
        email: z.string().email(),
        fullname: z.string(),
        location: z.string(),
        username: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const exists = await ctx.prisma.fan.findUnique({
        where: {uuid: input.uuid},
      });

      if (exists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "This fan already exists",
        });
      }

      const newFan = await ctx.prisma.fan.create({
        data: {
          ...input,
          timestamp: new Date(),
        },
      });

      return newFan;
    }),

  anthem: publicProcedure
    .input(
      z.object({
        uuid: z.string(),
        anthem: z.object({
          id: z.string(),
          name: z.string(),
          preview_url: z.string(),
          track_url: z.string(),
          artists: z.array(z.object({ id: z.string(), name: z.string() })),
          images: z.array(
            z.object({ url: z.string(), height: z.number(), width: z.number() })
          ),
          album_type: z.string(),
          album_group: z.string(),
          release_date: z.string(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const fanAnthem = await ctx.prisma.fan.update({
        where: {uuid: input.uuid},
        data: {
          ...input,
        },
      });

      return fanAnthem;
    }),

    signature: publicProcedure
    .input(
      z.object({
        uuid: z.string(),
        signature: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const fanSignature = await ctx.prisma.fan.update({
        where: {uuid: input.uuid},
        data: {
          ...input,
        },
      });

      return fanSignature;
    }),
});
