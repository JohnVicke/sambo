import { MotiPressable } from "moti/interactions";
import React from "react";
import { View } from "react-native";
import { ChevronRightIcon } from "react-native-heroicons/outline";

type NextScreenButtonProps = {
  onPress: () => void;
};

export const NextScreenButton = ({ onPress }: NextScreenButtonProps) => {
  return (
    <View>
      <MotiPressable onPress={onPress}>
        <ChevronRightIcon height={40} width={40} color="#000" />
      </MotiPressable>
    </View>
  );
};
