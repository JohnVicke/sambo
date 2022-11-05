import React from "react";
import { Text, View } from "react-native";

type DividerProps = React.PropsWithChildren;

export const Divider = ({ children }: DividerProps) => (
  <View className="flex flex-row">
    <View className="h-[1px] flex-1 bg-gray-600" />
    {children && <Text>{children}</Text>}
    <View className="h-[1px] flex-1 bg-gray-600" />
  </View>
);
