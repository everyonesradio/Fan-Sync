import type { inferProcedureInput } from "@trpc/server";
import { describe, it, expect, vi } from "vitest";

import { appRouter, type AppRouter } from "@/server/api/context";
//import { createTRPCContext } from "@/server/api/trpc";
import prisma from "@lib/prisma";

// Mock email service
vi.mock("@/server/services/email", () => ({
  EmailService: {
    sendElement: vi.fn().mockResolvedValue([{ 
      headers: { "x-message-id": "test-message-id" }
    }])
  }
}));

describe("Waitlist Router Integration Tests", () => {
  const caller = appRouter.createCaller({ prisma });

  describe("add", () => {
    it("should add email to waitlist", async () => {
      type Input = inferProcedureInput<AppRouter["waitlist"]["add"]>;
      const input: Input = {
        email: "test@example.com",
      };

      const result = await caller.waitlist.add(input);
      expect(result.message).toBe("Added to waitlist!");

      const waitlistEntry = await prisma.waitlist.findFirst({
        where: { email: input.email },
      });
      expect(waitlistEntry).toBeTruthy();
      expect(waitlistEntry?.email).toBe(input.email);
    });
  });
});
