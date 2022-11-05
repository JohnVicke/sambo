import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/home";
import { PlanningScreen } from "../screens/planning";
import { View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types";
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

export const MainNavigator = () => (
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
