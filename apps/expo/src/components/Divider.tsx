import React from "react";
import { Text, View } from "react-native";

type DividerProps = React.PropsWithChildren;

export const Divider = ({ children }: DividerProps) => (
  <View className="flex flex-row">
    <View className="flex-1 h-[1px] bg-gray-600" />
    {children && <Text>{children}</Text>}
    <View className="flex-1 h-[1px] bg-gray-600" />
  </View>
);
