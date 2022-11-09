import { t } from "../trpc";
import { z } from "zod";
import { authProcedure } from "../procedures/auth-procedure";

export const onBoardingRouter = t.router({
  addName: authProcedure.input(z.object({ name: z.string() })).mutation(async ({ ctx, input: { name } }) => {
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

  createHouseHold: authProcedure.input(z.object({ name: z.string() })).mutation(async ({ ctx, input: { name } }) => {
    const householdMember = await ctx.prisma.householdMember.create({
      data: {
        user: {
          connect: {
            id: ctx.user.id,
          },
        },
        household: {
          create: {
            name,
          },
        },
      },
      include: {
        household: true,
      },
    });

    const onboarding = await ctx.prisma.onboarding.update({
      where: { userId: ctx.user.id },
      data: {
        householdComplete: true,
      },
      select: {
        userinfoComplete: true,
        householdComplete: true,
      },
    });

    return { householdMember, ...onboarding };
  }),
});
