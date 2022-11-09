import { PrismaClient, Expense } from "@prisma/client";

const prisma = new PrismaClient();
const viktorMail = "viktormalmedal@gmail.com";
const johannaMail = "johanna@mail.io";

const expenses: Pick<Expense, "amount" | "description">[] = [
  {
    amount: 3000,
    description: "Hyra",
  },
];

const main = async () => {
  const johanna = await prisma.user.upsert({
    where: { email: johannaMail },
    update: {},
    create: {
      email: johannaMail,
      name: "Johanna Thorstensson",
      emailVerified: true,
    },
  });

  const viktor = await prisma.user.upsert({
    where: { email: viktorMail },
    update: {},
    create: {
      email: viktorMail,
      name: "Viktor Malmedal",
      emailVerified: true,
      onboarding: {
        create: {
          householdComplete: true,
          userinfoComplete: true,
        },
      },
    },
  });

  const household = await prisma.household.create({ data: { name: "Johanna och Viktors Hem" } });

  const users = [johanna, viktor];

  const householdMembers = await Promise.all(
    users.map(user =>
      prisma.householdMember.upsert({
        where: { userId: user.id },
        update: {},
        create: { userId: user.id, householdId: household.id },
      }),
    ),
  );

  console.log({ householdMembers });

  if (householdMembers?.[0]?.id) {
    const memberId = householdMembers[0].id;
    const exp = await Promise.all(expenses.map(expense => prisma.expense.create({ data: { memberId, ...expense } })));
    console.log({ exp });
  }
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
