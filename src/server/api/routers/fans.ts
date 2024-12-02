// ** Third-Party Imports
import { TRPCError } from "@trpc/server";
import { z } from "zod";

// ** Custom Components, Hooks, Utils, etc.
import { WelcomeEmail, WelcomeEmailSubject } from "@/server/emails/welcome";
import { EmailService } from "@/server/services/email";

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
          uuid: input.uuid,
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
        where: { uuid: input.uuid },
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
          track_url: z.string(),
          artists: z.array(z.object({ id: z.string(), name: z.string() })),
          images: z.array(
            z.object({ url: z.string(), height: z.number(), width: z.number() })
          ),
          album_name: z.string(),
          album_type: z.string(),
          album_group: z.string(),
          release_date: z.string(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const fanAnthem = await ctx.prisma.fan.update({
        where: { uuid: input.uuid },
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
        where: { uuid: input.uuid },
        data: {
          ...input,
        },
      });

      return fanSignature;
    }),

  email: publicProcedure
    .input(
      z.object({
        uuid: z.string(),
        email: z.string().email(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const exists = await ctx.prisma.fan.findUnique({
        where: { uuid: input.uuid },
        include: { anthem: true },
      });

      if (exists) {
        const result = await EmailService.sendElement(
          WelcomeEmail({
            fanName: exists.fullname,
            anthem: exists.anthem?.name,
            licenseId: exists.uuid,
          }),
          {
            to: input.email,
            subject: WelcomeEmailSubject(),
          }
        );

        if (!result) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to send email",
          });
        }

        return {
          message: "Email sent successfully!",
        };
      }

      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Fan not found",
      });
    }),
});
