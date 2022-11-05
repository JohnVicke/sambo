import React from "react";
import { SafeAreaView } from "react-native";

type DefaultLayoutProps = React.PropsWithChildren;

export const DefaultLayout = ({ children }: DefaultLayoutProps) => (
  <SafeAreaView className="flex flex-1 h-full w-full p-4">{children}</SafeAreaView>
);
