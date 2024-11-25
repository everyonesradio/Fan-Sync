import type { inferProcedureInput } from "@trpc/server";
import { describe, it, expect, beforeEach, vi } from "vitest";

import { appRouter, type AppRouter } from "@/server/api/context";
import prisma from "@lib/prisma";

// Mock email service
vi.mock("@/server/services/email", () => ({
  EmailService: {
    sendElement: vi.fn().mockResolvedValue([
      {
        headers: { "x-message-id": "test-message-id" },
      },
    ]),
  },
}));

describe("Fans Router Integration Tests", () => {
  const caller = appRouter.createCaller({ prisma });

  const mockFanData = {
    uuid: "test-uuid-123",
    profilePicture: "https://example.com/pic.jpg",
    dob: "1990-01-01",
    email: "test@example.com",
    fullname: "Test User",
    location: "Test City",
    username: "testuser",
  };

  const mockAnthem = {
    id: "song-123",
    name: "Test Song",
    preview_url: "https://example.com/preview",
    track_url: "https://example.com/track",
    artists: [{ id: "artist-123", name: "Test Artist" }],
    images: [{ url: "https://example.com/image.jpg", height: 300, width: 300 }],
    album_name: "Test Album",
    album_type: "album",
    album_group: "album",
    release_date: "2023-01-01",
  };

  beforeEach(async () => {
    await prisma.fan.deleteMany();
  });

  describe("create", () => {
    it("should create a new fan", async () => {
      type Input = inferProcedureInput<AppRouter["fans"]["create"]>;
      const input: Input = mockFanData;

      const result = await caller.fans.create(input);
      expect(result).toMatchObject(mockFanData);
    });

    it("should throw error if fan already exists", async () => {
      type Input = inferProcedureInput<AppRouter["fans"]["create"]>;
      const input: Input = mockFanData;

      await caller.fans.create(input);
      await expect(caller.fans.create(input)).rejects.toThrow("This fan already exists");
    });
  });

  describe("get", () => {
    it("should retrieve fan data", async () => {
      await caller.fans.create(mockFanData);
      const result = await caller.fans.get({ uuid: mockFanData.uuid });
      expect(result).toMatchObject(mockFanData);
    });
  });

  describe("anthem", () => {
    it("should update fan anthem", async () => {
      await caller.fans.create(mockFanData);
      const result = await caller.fans.anthem({
        uuid: mockFanData.uuid,
        anthem: mockAnthem,
      });
      expect(result.anthem).toMatchObject(mockAnthem);
    });
  });

  describe("signature", () => {
    it("should update fan signature", async () => {
      await caller.fans.create(mockFanData);
      const result = await caller.fans.signature({
        uuid: mockFanData.uuid,
        signature: "test-signature",
      });
      expect(result.signature).toBe("test-signature");
    });
  });
});
