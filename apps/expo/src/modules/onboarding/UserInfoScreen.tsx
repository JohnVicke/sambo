import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { View, Image } from "react-native";
import { Text } from "../../components/Text";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { InputField } from "../../components/InputField";
import { OnboardingNavigationProps } from "../../navigation/onboarding";
import { NextScreenButton } from "./NextScreenButton";
import { Button } from "../../components/Button";
import { trpc } from "../../utils/trpc";

type UserInfoScreenProps = OnboardingNavigationProps;

type FormValues = {
  name: string;
};

export const UserInfoScreen = ({ navigation }: UserInfoScreenProps) => {
  const ctx = trpc.useContext();
  const publish = trpc.onboarding.addName.useMutation({
    async onSuccess({ household_complete, name }) {
      const me = ctx.auth.me.getData();
      if (me)
        ctx.auth.me.setData({
          user: {
            ...me.user,
            name,
            onboarding: {
              userinfo_complete: true,
              household_complete: !!household_complete,
            },
          },
        });
      navigation.navigate("Household");
    },
  });
  const form = useForm<FormValues>();

  const handleSubmit = form.handleSubmit(({ name }) => {
    publish.mutate({ name });
  });

  return (
    <SafeAreaProvider className="h-full w-full flex flex-col justify-center p-8">
      <FormProvider {...form}>
        <Image source={require("./onboarding1.png")} />
        <Text variant="h1">Välkommen till SamboAppen</Text>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore
        </Text>
        <View className="my-6" />
        <InputField
          rules={{ required: true }}
          name="name"
          label="Vad är ditt namn?"
        />
        <View className="my-2" />
        <Button onPress={handleSubmit}>Fortsätt</Button>
      </FormProvider>
    </SafeAreaProvider>
  );
};
