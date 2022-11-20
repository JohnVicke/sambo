import React from "react";

import { Text } from "../components/Text";
import { SafeAreaView, View } from "react-native";
import { trpc } from "../utils/trpc";
import { Button } from "../components/Button";
import { MainNavigatorProps } from "../navigation/main";
import { DefaultLayout } from "../modules/layouts/DefaultLayout";

export const HomeScreen = ({ navigation }: MainNavigatorProps) => {
  const { data, isLoading } = trpc.household.get.useQuery();

  if (isLoading || !data?.household) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <DefaultLayout>
      <View className="h-full w-full p-4">
        <Button onPress={() => navigation.navigate("Expense")}>Utgifter</Button>
        <Button onPress={() => navigation.navigate("Profile")}>Profil</Button>
      </View>
    </DefaultLayout>
  );
};
