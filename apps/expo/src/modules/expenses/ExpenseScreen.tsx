import React from "react";

import { View } from "react-native";
import { Text } from "../../components/Text";
import { GradientText } from "../../components/GradientText";
import { MainNavigatorProps } from "../../navigation/main";
import { trpc } from "../../utils/trpc";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { Divider } from "../../components/Divider";
import { GradientButton } from "../../components/GradientButton";
import { br } from "../../components/Br";

type ExpenseSummaryProps = {
  name: string;
  balance: number;
};

const ExpenseSummary = ({ name, balance }: ExpenseSummaryProps) => {
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
      <View className="flex flex-row justify-between items-start">
        <View className="flex flex-col">
          <Text>Är skyldig dig:</Text>
          <Text color={color} medium size={40}>
            {balance} kr
          </Text>
        </View>
        <GradientButton>Begär{br}Pengar</GradientButton>
      </View>
      <View className="my-2">
        <Divider />
      </View>
    </View>
  );
};

export const ExpenseScreen = ({}: MainNavigatorProps) => {
  const household = trpc.household.get.useQuery();
  if (!household.data?.household) return null;

  return (
    <DefaultLayout>
      <ExpenseSummary name={household.data.household.name} balance={1000} />
    </DefaultLayout>
  );
};
