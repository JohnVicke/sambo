import { HeaderBackButtonProps as RNHeaderBackButtonProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import React from "react";
import { View } from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";

type HeaderBackButtonProps = RNHeaderBackButtonProps;

export const HeaderBackButton = ({ canGoBack }: HeaderBackButtonProps) => {
  if (canGoBack) return null;

  return (
    <View className="bg-neutral-300 rounded-full p-1">
      <ChevronLeftIcon height={16} width={16} color="black" />
    </View>
  );
};
