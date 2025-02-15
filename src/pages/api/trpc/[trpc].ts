// ** Third-Party Imports
import * as trpcNext from "@trpc/server/adapters/next";

// ** Custom Components, Hooks, Utils, etc.
import { env } from "@/env";
import { appRouter } from "@/server/api/context";
import { createTRPCContext } from "@/server/api/trpc";

/**
 * This is `tRPC` API handler export for Next.js, responsible for routing and executing tRPC procedures.
 * It integrates with the Next.js API routes to handle tRPC requests and responses.
 * @link https://trpc.io/docs/v11/server/adapters
 *
 * Features:
 * - Utilizes `@trpc/server/adapters/next` to create a Next.js API handler for tRPC.
 * - Connects the `appRouter` to define available tRPC procedures and endpoints.
 * - Creates a tRPC context for each request using `createTRPCContext`.
 * - Logs errors to the console during development for easier debugging.
 *
 * @returns A Next.js API handler function that processes tRPC requests.
 */

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
          );
        }
      : undefined,
});
