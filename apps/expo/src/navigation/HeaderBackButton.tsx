import { HeaderBackButtonProps as RNHeaderBackButtonProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { MainScreens, MainNavigatorProps } from "./main";

type HeaderBackButtonProps = RNHeaderBackButtonProps &
  MainNavigatorProps & {
    to?: MainScreens;
  };

export const HeaderBackButton = ({ canGoBack, navigation, to }: HeaderBackButtonProps) => {
  if (!canGoBack) return null;

  const goTo = () => {
    if (to) {
      navigation.navigate(to);
      return;
    }
    navigation.goBack();
  };

  return (
    <TouchableOpacity onPress={goTo}>
      <View className="rounded-full bg-neutral-300 p-1">
        <ChevronLeftIcon height={16} width={16} color="black" />
      </View>
    </TouchableOpacity>
  );
};
