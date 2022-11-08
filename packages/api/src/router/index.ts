import { t } from "../trpc";

import { authRouter } from "./auth";
import { expenseRouter } from "./expense";
import { householdRouter } from "./household";
import { onBoardingRouter } from "./onboarding";

export const appRouter = t.router({
  auth: authRouter,
  onboarding: onBoardingRouter,
  household: householdRouter,
  expense: expenseRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
