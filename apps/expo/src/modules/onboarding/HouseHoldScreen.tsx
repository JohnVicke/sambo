import React from "react";
import { View, Image } from "react-native";
import { Button } from "../../components/Button";
import { OnboardingNavigationProps } from "../../navigation/onboarding";

type HouseHoldScreenProps = OnboardingNavigationProps;

export const HouseHoldScreen = ({ navigation }: HouseHoldScreenProps) => (
  <View className="h-full w-full flex flex-col p-8 justify-center">
    <Image source={require("./onboarding2.png")} />
    <Button onPress={() => navigation.navigate("CreateHousehold")}>Skapa</Button>
    <Button onPress={() => navigation.navigate("JoinHousehold")}>Gå med</Button>
  </View>
);
