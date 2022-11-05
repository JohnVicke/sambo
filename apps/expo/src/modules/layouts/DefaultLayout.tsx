import React from "react";
import { SafeAreaView } from "react-native";

type DefaultLayoutProps = React.PropsWithChildren;

export const DefaultLayout = ({ children }: DefaultLayoutProps) => (
  <SafeAreaView className="flex h-full w-full flex-1 p-4 bg-neutral-200">{children}</SafeAreaView>
);
