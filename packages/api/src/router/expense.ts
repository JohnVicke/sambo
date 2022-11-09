import { t } from "../trpc";
import { z } from "zod";
import { authProcedure } from "../procedures/auth-procedure";
import { TRPCError } from "@trpc/server";

type SummaryResponse = {
  name: string;
  userId: string;
  expenseSum: number;
};

export const expenseRouter = t.router({
  add: authProcedure
    .input(z.object({ description: z.string(), amount: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const member = await ctx.prisma.householdMember.findFirst({ where: { userId: ctx.user.id } });
      if (!member) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      const expense = await ctx.prisma.expense.create({
        data: {
          ...input,
          memberId: member.id,
        },
      });
      return expense;
    }),

  getStanding: authProcedure.input(z.object({ householdId: z.string() })).query(async ({ ctx, input }) => {
    const { householdId } = input;
    try {
      const hhSpendings = await ctx.prisma.$queryRaw<SummaryResponse[]>`
SELECT u.name, u.id as userId, SUM(e.amount) as expenseSum
FROM Household h 
INNER JOIN HouseholdMember hm 
ON h.id = hm.householdId
INNER JOIN User u 
ON u.id = hm.userId 
INNER JOIN Expense e 
ON e.memberId = hm.id
WHERE e.complete != true AND h.id = ${householdId}
GROUP BY hm.id, u.name, u.id
    `;

      const owed = hhSpendings.reduce((acc, spending) => {
        if (spending.userId === ctx.user.id) {
          return acc;
        }
        return acc + spending.expenseSum;
      }, 0);

      const spent = hhSpendings.find(spending => spending.userId === ctx.user.id)?.expenseSum || 0;

      console.log({ owed });
      console.log({ spent });

      return hhSpendings;
    } catch (error) {
      console.error(error);
      return error;
    }
  }),

  getHousehold: authProcedure.input(z.object({ householdId: z.string() })).query(async ({ ctx, input }) => {
    const data = await ctx.prisma.household.findFirst({
      where: { id: input.householdId },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        members: {
          select: {
            id: true,
            userId: true,
            expense: true,
          },
        },
      },
    });

    if (!data?.members?.length) throw new TRPCError({ code: "NOT_FOUND" });

    const me = data.members.find(m => m.userId === ctx.user.id);
    if (!me) throw new TRPCError({ code: "NOT_FOUND" });

    const expenses = data.members.flatMap(d => d.expense);

    if (!expenses?.length) throw new TRPCError({ code: "NOT_FOUND" });

    return expenses;
  }),
});
