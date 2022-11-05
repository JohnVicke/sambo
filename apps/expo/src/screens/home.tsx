import React from "react";

import { Text } from "../components/Text";
import { SafeAreaView, View } from "react-native";
import { trpc } from "../utils/trpc";

export const HomeScreen = () => {
  const { data, isLoading } = trpc.household.get.useQuery();

  if (isLoading || !data?.household) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <SafeAreaView>
      <View className="h-full w-full p-4">
        <Text variant="h1">{data.household.name}</Text>
      </View>
    </SafeAreaView>
  );
};
