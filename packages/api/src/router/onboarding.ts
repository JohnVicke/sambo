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
            userinfo_complete: true,
          },
        },
      },
      select: {
        onboarding: {
          select: {
            userinfo_complete: true,
            household_complete: true,
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
      where: { user_id: ctx.user.id },
      data: {
        household_complete: true,
      },
      select: {
        userinfo_complete: true,
        household_complete: true,
      },
    });

    return { householdMember, ...onboarding };
  }),
});
