import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";

type DefaultLayoutProps = React.PropsWithChildren & {
  scroll?: boolean;
};

export const DefaultLayout = ({ children, scroll }: DefaultLayoutProps) => {
  const Wrapper = scroll ? ScrollView : View;

  return (
    <SafeAreaView className="flex h-full w-full flex-1 bg-neutral-200 p-4">
      <Wrapper horizontal={false}>{children}</Wrapper>
    </SafeAreaView>
  );
};
