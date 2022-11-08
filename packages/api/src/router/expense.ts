import { t } from "../trpc";
import { z } from "zod";
import { authProcedure } from "../procedures/auth-procedure";
import { TRPCError } from "@trpc/server";

export const expenseRouter = t.router({
  add: authProcedure
    .input(z.object({ description: z.string(), amount: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const member = await ctx.prisma.householdMember.findFirst({ where: { user_id: ctx.user.id } });
      if (!member) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      const expense = await ctx.prisma.expense.create({
        data: {
          ...input,
          member_id: member.id,
        },
      });
      return expense;
    }),

  getHousehold: authProcedure.input(z.object({ household_id: z.string() })).query(async ({ ctx, input }) => {
    const data = await ctx.prisma.household.findFirst({
      where: { id: input.household_id },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        members: {
          select: {
            id: true,
            user_id: true,
            expense: true,
          },
        },
      },
    });

    if (!data?.members?.length) throw new TRPCError({ code: "NOT_FOUND" });

    const me = data.members.find(m => m.user_id === ctx.user.id);
    if (!me) throw new TRPCError({ code: "NOT_FOUND" });

    console.log({ me });

    const spent = await ctx.prisma.expense.aggregate({
      where: { member_id: { not: me.id } },
      _sum: {
        amount: true,
      },
    });

    const owed = await ctx.prisma.expense.aggregate({
      where: { member_id: me.id },
      _sum: {
        amount: true,
      },
    });

    console.log({ spent, owed });

    const expenses = data.members.flatMap(d => d.expense);

    if (!expenses?.length) throw new TRPCError({ code: "NOT_FOUND" });

    return expenses;
  }),
});
