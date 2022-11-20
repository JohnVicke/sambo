import React from "react";

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
import { inferProcedureOutput } from "@trpc/server";
import { AppRouter } from "@acme/api";
import { AnimatedAddButton } from "./AnimatedAddButton";

type ExpenseSummaryProps = {
  name: string;
  householdId: string;
};

const ExpenseSummary = ({ name, householdId }: ExpenseSummaryProps) => {
  const { data, isLoading } = trpc.expense.getStanding.useQuery({ householdId });

  const color = isLoading ? "text-black" : data?.spent ? "text-emerald-500" : "text-red-600";

  return (
    <View>
      <GradientText>{name}</GradientText>
      <View className="my-1" />
      <View className="flex flex-row items-start justify-between">
        <View>
          <Text>{data?.spent ? "Är skyldig dig:" : "Du är skyldig:"}</Text>
          <Text color={color} medium xl>
            {isLoading ? "---" : data?.spent || data?.owed} kr
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
        <ExpenseSummary name={household.data.household.name} householdId={household.data.household.id} />
        <View className="w-full rounded-md bg-neutral-300"></View>
        {household.data.household.id && <Expenses householdId={household.data.household.id} />}
      </DefaultLayout>
      <View className="absolute right-0 left-0 bottom-4 z-10 w-full items-center justify-center">
        <AnimatedAddButton description="Lägg till utgift" onPress={goToAddExpense} />
      </View>
    </View>
  );
};
