import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/home";
import { PlanningScreen } from "../screens/planning";
import { View } from "react-native";
import { Text } from "../components/Text";
import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types";
import { ExpenseScreen } from "../modules/expenses/ExpenseScreen";
import { HeaderBackButton } from "./HeaderBackButton";
import { AddExpenseScreen } from "../modules/expenses/AddExpenseScreen";
import { ProfileScreen } from "../screens/profile";

type RootStackParamlist = {
  Home: undefined;
  Planning: undefined;
  Expense: undefined;
  AddExpense: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamlist>();

export type MainScreens = keyof RootStackParamlist;

export type MainNavigatorProps = {
  navigation: NativeStackNavigationProp<RootStackParamlist>;
};

export const MainNavigator = () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={({ navigation }: MainNavigatorProps) => ({
      headerShadowVisible: false,
      headerTitleAlign: "center",
      animation: "slide_from_right",
      headerTitle: ({ children }) => <Text variant="overline">{children}</Text>,
      headerLeft: props => <HeaderBackButton {...props} navigation={navigation} />,
      headerBackground: () => <View className="h-full w-full bg-neutral-200" />,
      headerBackVisible: false,
    })}
  >
    <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Hem" }} />
    <Stack.Screen
      name="Expense"
      component={ExpenseScreen}
      options={({ navigation }) => ({
        title: "utgifter",
        headerLeft: props => <HeaderBackButton {...props} to="Home" navigation={navigation} />,
      })}
    />
    <Stack.Screen
      name="AddExpense"
      component={AddExpenseScreen}
      options={{
        animation: "simple_push",
        title: "lägg till utgift",
      }}
    />
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        animation: "simple_push",
        title: "Profil",
      }}
    />
    <Stack.Screen name="Planning" component={PlanningScreen} />
  </Stack.Navigator>
);
