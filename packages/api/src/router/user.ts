import { t } from "../trpc";
import { z } from "zod";
import { authProcedure } from "../procedures/auth-procedure";
import { TRPCError } from "@trpc/server";

export const userRouter = t.router({
  me: authProcedure.query(async ({ ctx }) => {
    const me = await ctx.prisma.user.findFirst({ where: { id: ctx.user.id } });
    if (!me) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    return me;
  }),
  addImage: authProcedure.input(z.object({ name: z.string() })).mutation(async ({ ctx, input: { name } }) => {
    const res = await ctx.prisma.user.update({
      where: { id: ctx.user.id },
      data: {
        name,
        onboarding: {
          update: {
            userinfoComplete: true,
          },
        },
      },
      select: {
        onboarding: {
          select: {
            userinfoComplete: true,
            householdComplete: true,
          },
        },
      },
    });
    return { name, ...res.onboarding };
  }),
});
