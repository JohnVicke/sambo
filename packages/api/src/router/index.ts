import { t } from "../trpc";

import { authRouter } from "./auth";
import { expenseRouter } from "./expense";
import { householdRouter } from "./household";
import { onBoardingRouter } from "./onboarding";
import { userRouter } from "./user";
import { imageServiceRouter } from "./imageService";

export const appRouter = t.router({
  auth: authRouter,
  onboarding: onBoardingRouter,
  household: householdRouter,
  expense: expenseRouter,
  user: userRouter,
  imageService: imageServiceRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
