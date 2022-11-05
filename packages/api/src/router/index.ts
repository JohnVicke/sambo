import { t } from "../trpc";

import { authRouter } from "./auth";
import { householdRouter } from "./household";
import { onBoardingRouter } from "./onboarding";

export const appRouter = t.router({
  auth: authRouter,
  onboarding: onBoardingRouter,
  household: householdRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
