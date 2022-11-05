import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/home";
import { PlanningScreen } from "../screens/planning";
import { Text } from "../components/Text";
import { View } from "react-native";
import {
  HeaderBackButtonProps,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack/lib/typescript/src/types";
import { ExpenseScreen } from "../modules/expenses/ExpenseScreen";

type RootStackParamlist = {
  Home: undefined;
  Planning: undefined;
  Expense: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamlist>();

export type MainNavigatorProps = {
  navigation: NativeStackNavigationProp<RootStackParamlist>;
};

const CustomHeaderTitle = ({
  children,
}: {
  children: string;
  tintColor?: string | undefined;
}) => {
  return <Text>{children}</Text>;
};

export const MainNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Expense"
      screenOptions={{
        headerShadowVisible: false,
        headerBackground: () => <View className="bg-neutral-200" />,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Expense" component={ExpenseScreen} />
      <Stack.Screen name="Planning" component={PlanningScreen} />
    </Stack.Navigator>
  );
};
