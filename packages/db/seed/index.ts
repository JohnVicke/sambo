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
      email_verified: true,
    },
  });

  const viktor = await prisma.user.upsert({
    where: { email: viktorMail },
    update: {},
    create: {
      email: viktorMail,
      name: "Viktor Malmedal",
      email_verified: true,
      onboarding: {
        create: {
          household_complete: true,
          userinfo_complete: true,
        },
      },
    },
  });

  const household = await prisma.household.create({ data: { name: "Johanna och Viktors Hem" } });

  const users = [johanna, viktor];

  const householdMembers = await Promise.all(
    users.map(user =>
      prisma.householdMember.upsert({
        where: { user_id: user.id },
        update: {},
        create: { user_id: user.id, household_id: household.id },
      }),
    ),
  );

  console.log({ householdMembers });

  if (householdMembers?.[0]?.id) {
    const member_id = householdMembers[0].id;
    const exp = await Promise.all(expenses.map(expense => prisma.expense.create({ data: { member_id, ...expense } })));
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
