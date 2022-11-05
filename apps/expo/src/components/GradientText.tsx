import React from "react";

import { LinearGradient } from "expo-linear-gradient";
import { Text } from "./Text";
import MaskedView from "@react-native-masked-view/masked-view";
import { View } from "react-native";

export const GradientText = ({ children }: React.PropsWithChildren) => (
  <MaskedView maskElement={<Text variant="h1">{children}</Text>}>
    <LinearGradient colors={["#ff9e9e", "#706adc"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
      <View className="opacity-0">
        <Text variant="h1">{children}</Text>
      </View>
    </LinearGradient>
  </MaskedView>
);
