import React, { useState } from "react";

import { format } from "date-fns";
import { FlatList, View } from "react-native";
import { Text } from "../../components/Text";
import { GradientText } from "../../components/GradientText";
import { MainNavigatorProps } from "../../navigation/main";
import { trpc } from "../../utils/trpc";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { Divider } from "../../components/Divider";
import { GradientButton } from "../../components/GradientButton";
import { br } from "../../components/Br";
import { MotiView } from "moti";
import { MotiPressable } from "moti/interactions";
import { PlusIcon } from "react-native-heroicons/outline";
import { inferProcedureOutput } from "@trpc/server";
import { AppRouter } from "@acme/api";

type AnimatedAddButtonProps = {
  description: string;
  onPress: () => void;
};

const AnimatedAddButton = ({ description, onPress }: AnimatedAddButtonProps) => {
  const [visibile, setVisible] = useState(true);
  return (
    <MotiPressable onPress={onPress}>
      <MotiView
        className="flex flex-row bg-rose-300 p-2"
        from={{ borderRadius: 10 }}
        animate={{ borderRadius: 50 }}
        transition={{ delay: 5000 }}
      >
        {visibile && (
          <MotiView
            className="mr-2"
            from={{ translateX: 0, opacity: 1 }}
            animate={{ translateX: 20, opacity: 0 }}
            transition={{ type: "timing", delay: 4800 }}
            onDidAnimate={() => {
              setVisible(false);
            }}
          >
            <Text>{description}</Text>
          </MotiView>
        )}
        <MotiView
          className="w-[24px]"
          from={{ rotateZ: "180deg" }}
          animate={{ rotateZ: "0deg" }}
          transition={{ delay: 5000 }}
        >
          <PlusIcon height={24} width={24} color="black" />
        </MotiView>
      </MotiView>
    </MotiPressable>
  );
};

type ExpenseSummaryProps = {
  name: string;
  balance: number;
  householdId: string;
};

const ExpenseSummary = ({ name, balance, householdId }: ExpenseSummaryProps) => {
  const { data, isLoading } = trpc.expense.getStanding.useQuery({ householdId });

  let color = "text-black";

  if (balance > 0) {
    color = "text-emerald-500";
  } else if (balance < 0) {
    color = "text-red-600";
  }

  return (
    <View>
      <GradientText>{name}</GradientText>
      <View className="my-1" />
      <View className="flex flex-row items-start justify-between">
        <View>
          <Text>Är skyldig dig:</Text>
          <Text color={color} medium xl>
            {balance} kr
          </Text>
        </View>
        <GradientButton>Begär{br}Pengar</GradientButton>
      </View>
      <View className="my-4">
        <Divider />
      </View>
    </View>
  );
};

interface ExpenseProps {
  expense: inferProcedureOutput<AppRouter["expense"]["getHousehold"]>[number];
}

const Expense = ({ expense }: ExpenseProps) => {
  const { description, amount, createdAt } = expense;
  const date = format(createdAt, "LLL d").split("/");
  return (
    <View className="w-full flex-row items-center justify-between">
      <View>
        <Text>{description}</Text>
        <Text sm>{date}</Text>
      </View>
      <Text medium>{amount} kr</Text>
    </View>
  );
};

type ExpensesProps = {
  householdId: string;
};

const Expenses = ({ householdId }: ExpensesProps) => {
  const { data, isLoading, error } = trpc.expense.getHousehold.useQuery({ householdId });
  if (isLoading) return <Text>Skeleton loader...</Text>;

  if (error?.data?.code === "NOT_FOUND") {
    return <Text>Inga utgifter ännu!</Text>;
  }
  return (
    <View className="h-1/2 rounded-md bg-neutral-100 p-2">
      <FlatList
        className="flex-grow-0"
        nestedScrollEnabled
        ItemSeparatorComponent={() => (
          <View className="my-2">
            <Divider />
          </View>
        )}
        data={data}
        renderItem={({ item }) => <Expense expense={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export const ExpenseScreen = ({ navigation }: MainNavigatorProps) => {
  const goToAddExpense = () => navigation.navigate("AddExpense");

  const household = trpc.household.get.useQuery();

  if (!household.data?.household) return null;

  return (
    <View className="flex-1">
      <DefaultLayout scroll>
        <ExpenseSummary name={household.data.household.name} balance={1000} householdId={household.data.household.id} />
        <View className="w-full rounded-md bg-neutral-300"></View>
        {household.data.household.id && <Expenses householdId={household.data.household.id} />}
      </DefaultLayout>
      <View className="absolute right-0 left-0 bottom-4 z-10 w-full items-center justify-center">
        <AnimatedAddButton description="Lägg till utgift" onPress={goToAddExpense} />
      </View>
    </View>
  );
};
