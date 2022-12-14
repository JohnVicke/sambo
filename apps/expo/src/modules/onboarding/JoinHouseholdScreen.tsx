import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { View, Image } from "react-native";
import { Button } from "../../components/Button";
import { OnboardingNavigationProps } from "../../navigation/onboarding";
import { CodeText } from "../../components/CodeText";

type HouseHoldScreenProps = OnboardingNavigationProps;

type FormValues = {
  code?: string;
};

export const JoinHouseholdScreen = ({ navigation }: HouseHoldScreenProps) => {
  const form = useForm<FormValues>();
  const code = form.watch("code");

  const handleSubmit = form.handleSubmit(values => {
    navigation.navigate("Household");
  });

  return (
    <View className="flex h-full w-full flex-col justify-center p-8">
      <FormProvider {...form}>
        <Image source={require("./onboarding2.png")} />
        <View className="my-2" />
        <View className="items-center">
          <CodeText code={code} length={4} name="code" />
        </View>
      </FormProvider>
      <View className="my-2" />
      <Button onPress={handleSubmit}>Fortsätt</Button>
    </View>
  );
};
