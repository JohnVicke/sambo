import React from "react";
import { Text, View } from "react-native";

type DividerProps = React.PropsWithChildren;

export const Divider = ({ children }: DividerProps) => (
  <View className="flex flex-row">
    <View className="h-[1px] flex-1 bg-neutral-800 opacity-25" />
    {children && <Text>{children}</Text>}
    <View className="h-[1px] flex-1 bg-neutral-800 opacity-25" />
  </View>
);
