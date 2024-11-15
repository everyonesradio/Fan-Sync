// ** Third-Party Imports
import * as trpcNext from "@trpc/server/adapters/next";

// ** Custom Components, Hooks, Utils, etc.
import { env } from "@/env";
import { appRouter } from "@/server/api/context";
import { createTRPCContext } from "@/server/api/trpc";

// export API handler
// @link https://trpc.io/docs/v11/server/adapters
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
