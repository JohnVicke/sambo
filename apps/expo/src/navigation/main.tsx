import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/home";
import { PlanningScreen } from "../screens/planning";
import { View } from "react-native";
import { Text } from "../components/Text";
import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types";
import { ExpenseScreen } from "../modules/expenses/ExpenseScreen";
import { HeaderBackButton } from "./HeaderBackButton";

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
      headerTitleAlign: "center",
      headerTitle: ({ children }) => <Text variant="overline">{children}</Text>,
      headerLeft: props => <HeaderBackButton {...props} />,
      headerBackground: () => <View className="bg-neutral-200 w-full h-full" />,
    }}
  >
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Expense" component={ExpenseScreen} options={{ title: "utgifter" }} />
    <Stack.Screen name="Planning" component={PlanningScreen} />
  </Stack.Navigator>
);
