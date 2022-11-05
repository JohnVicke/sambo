import React from "react";

import { View, Text } from "react-native";
import { MainNavigatorProps } from "../../navigation/main";
import { GradientText } from "../../components/GradientText";
import { trpc } from "../../utils/trpc";
import { DefaultLayout } from "../layouts/DefaultLayout";

export const ExpenseScreen = ({ navigation }: MainNavigatorProps) => {
  const household = trpc.household.get.useQuery();
  if (!household.data?.household) return null;

  return (
    <DefaultLayout>
      <GradientText>{household.data.household.name}</GradientText>
      <Text>hello</Text>
    </DefaultLayout>
  );
};
