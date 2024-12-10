/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { render, screen } from "@testing-library/react";
import { Howl } from "howler";
import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";

import MediaPlayer from "@/components/media-player";

// Mock Howler
vi.mock("howler", () => ({
  Howl: vi.fn().mockImplementation((config) => ({
    play: vi.fn(),
    fade: vi.fn(),
    unload: vi.fn(),
    ...config,
  })),
}));

describe("MediaPlayer Integration Tests", () => {
  const mockAnthem = {
    id: "test-123",
    name: "Test Song",
    preview_url: "https://example.com/preview.mp3",
    track_url: "https://example.com/track",
    artists: [{ id: "artist-123", name: "Test Artist" }],
    images: [{ url: "https://example.com/image.jpg", height: 300, width: 300 }],
    album_name: "Test Album",
    album_type: "album",
    album_group: "album",
    release_date: "2023-01-01",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should initialize and play audio when component mounts", () => {
    render(<MediaPlayer selectedAnthem={mockAnthem} />);

    expect(Howl).toHaveBeenCalledWith({
      src: [mockAnthem.preview_url],
      volume: 0,
      html5: true,
      onend: expect.any(Function),
    });

    const howlInstance = vi.mocked(Howl).mock.results[0].value;
    expect(howlInstance.play).toHaveBeenCalled();
    expect(howlInstance.fade).toHaveBeenCalledWith(0, 1, 500);
  });

  it("should display anthem details correctly", () => {
    render(<MediaPlayer selectedAnthem={mockAnthem} />);

    expect(screen.getAllByText("Test Song")).toBeDefined();
    expect(screen.getAllByText("Album - 2023")).toBeDefined();
    expect(screen.getAllByAltText("Album Cover")).toBeDefined();
  });

  it("should cleanup audio when component unmounts", () => {
    const { unmount } = render(<MediaPlayer selectedAnthem={mockAnthem} />);
    const howlInstance = vi.mocked(Howl).mock.results[0].value;

    unmount();

    expect(howlInstance.fade).toHaveBeenLastCalledWith(1, 0, 300);
    // Wait for the cleanup timeout
    vi.advanceTimersByTime(300);
    expect(howlInstance.unload).toHaveBeenCalled();
  });
});
