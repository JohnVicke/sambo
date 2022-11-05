import { TRPCError } from "@trpc/server";
import { t } from "../trpc";

const isAuthenticated = t.middleware(async ({ ctx, next }) => {
  if (!ctx.user?.id) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

export const authProcedure = t.procedure.use(isAuthenticated);
