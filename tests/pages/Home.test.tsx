/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import Home from "@/pages";

// Mock the trpc api
vi.mock("@/utils/trpc", () => ({
  api: {
    waitlist: {
      add: {
        useMutation: () => ({
          mutateAsync: vi.fn(),
        }),
      },
    },
  },
}));

// Mock next/router
vi.mock("next/router", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("Home Page", () => {
  it("renders the main heading", () => {
    render(<Home />);
    expect(screen.getAllByText("FanSync")).toBeDefined();
  });

  it("renders the demo button", () => {
    render(<Home />);
    expect(screen.getAllByText("DEMO")).toBeDefined();
  });

  it("renders email input field", () => {
    render(<Home />);
    expect(screen.getAllByPlaceholderText("name@example.com")).toBeDefined();
  });

  it("renders waitlist button", () => {
    render(<Home />);
    expect(screen.getAllByText("Join the waitlist")).toBeDefined();
  });

  it("validates email input", async () => {
    render(<Home />);
    const emailInput = screen.getAllByPlaceholderText("name@example.com")[0];
    const submitButton = screen.getAllByText("Join the waitlist")[0];

    // Test invalid email
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.click(submitButton);

    // Test valid email
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.click(submitButton);
  });
});
