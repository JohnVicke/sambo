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
      <View className="h-16 flex flex-row items-center justify-center m-[1px] p-2 rounded-md bg-neutral-200">
        <Text medium>{children}</Text>
        <View className="mx-2" />
        <BanknotesIcon height={32} width={32} color="black" />
      </View>
    </LinearGradient>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  circleGradient: {
    margin: 1,
    backgroundColor: "bg-base-200",
    borderRadius: 5,
  },
  visit: {
    margin: 4,
    paddingHorizontal: 6,
    textAlign: "center",
    backgroundColor: "white",
    color: "#008f68",
    fontSize: 12,
  },
});
