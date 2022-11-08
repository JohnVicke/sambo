import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "./Text";
import { BanknotesIcon } from "react-native-heroicons/outline";

type GradientButtonProps = React.PropsWithChildren & {
  onPress?: () => void;
};

export const GradientButton = ({ children, onPress }: GradientButtonProps) => (
  <TouchableOpacity onPress={onPress}>
    <LinearGradient
      start={{ x: 0.2, y: 1 }}
      end={{ x: 1.1, y: 1 }}
      colors={["#3F3D56", "#6161FE", "#FF9E9E"]}
      style={{ borderRadius: 5 }}
    >
      <View className="m-[1px] flex h-14 flex-row items-center justify-center rounded-md bg-neutral-200 p-2">
        <Text medium>{children}</Text>
        <View className="mx-2" />
        <BanknotesIcon height={32} width={32} color="black" />
      </View>
    </LinearGradient>
  </TouchableOpacity>
);
