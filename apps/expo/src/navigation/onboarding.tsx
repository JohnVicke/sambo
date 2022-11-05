import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import {
  HeaderBackButtonProps,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack/lib/typescript/src/types";
import { UserInfoScreen } from "../modules/onboarding/UserInfoScreen";
import { HouseHoldScreen } from "../modules/onboarding/HouseHoldScreen";
import type { inferProcedureOutput } from "@trpc/server";
import { trpc } from "../utils/trpc";
import { AppRouter } from "@acme/api";
import { JoinHouseholdScreen } from "../modules/onboarding/JoinHouseholdScreen";
import { CreateHouseholdScreen } from "../modules/onboarding/CreateHouseholdScreen";

type RootStackParamlist = {
  UserInfo: undefined;
  Household: undefined;
  JoinHousehold: undefined;
  CreateHousehold: undefined;
};

type Onboarding = inferProcedureOutput<AppRouter["auth"]["me"]>["user"]["onboarding"];

const getInitialRoute = (onboarding: Onboarding) => {
  if (!onboarding?.userinfo_complete) {
    return "UserInfo";
  }
  return "Household";
};

const Stack = createNativeStackNavigator<RootStackParamlist>();

export type OnboardingNavigationProps = {
  navigation: NativeStackNavigationProp<RootStackParamlist>;
};

const CustomHeaderLeft = ({ canGoBack }: HeaderBackButtonProps) => {
  if (!canGoBack) return null;

  return (
    <View>
      <Text>Go back</Text>
    </View>
  );
};

export const OnboardingNavigator = () => {
  const { data, isLoading } = trpc.auth.me.useQuery();

  if (isLoading || !data?.user) {
    return <Text>loading...</Text>;
  }

  const initialRouteName = getInitialRoute(data.user.onboarding);

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="UserInfo"
        component={UserInfoScreen}
        options={{
          headerLeft: props => <CustomHeaderLeft {...props} />,
        }}
      />
      <Stack.Screen
        name="Household"
        component={HouseHoldScreen}
        options={{
          headerLeft: props => <CustomHeaderLeft {...props} />,
        }}
      />
      <Stack.Screen
        name="JoinHousehold"
        component={JoinHouseholdScreen}
        options={{
          headerLeft: props => <CustomHeaderLeft {...props} />,
        }}
      />
      <Stack.Screen
        name="CreateHousehold"
        component={CreateHouseholdScreen}
        options={{
          headerLeft: props => <CustomHeaderLeft {...props} />,
        }}
      />
    </Stack.Navigator>
  );
};
