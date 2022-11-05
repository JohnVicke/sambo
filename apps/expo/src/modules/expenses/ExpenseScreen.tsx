import React from "react";

import { Text } from "react-native";
import { GradientText } from "../../components/GradientText";
import { MainNavigatorProps } from "../../navigation/main";
import { trpc } from "../../utils/trpc";
import { DefaultLayout } from "../layouts/DefaultLayout";

export const ExpenseScreen = ({}: MainNavigatorProps) => {
  const household = trpc.household.get.useQuery();
  if (!household.data?.household) return null;

  return (
    <DefaultLayout>
      <GradientText>{household.data.household.name}</GradientText>
      <Text>hello</Text>
    </DefaultLayout>
  );
};
