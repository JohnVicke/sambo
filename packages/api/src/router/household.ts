import { t } from "../trpc";
import { z } from "zod";
import { authProcedure } from "../procedures/auth-procedure";

export const householdRouter = t.router({
  get: authProcedure.query(async ({ ctx }) => {
    const household = await ctx.prisma.household.findFirst({
      where: {
        members: {
          some: {
            user_id: ctx.user.id,
          },
        },
      },
    });

    return { household };
  }),
});
