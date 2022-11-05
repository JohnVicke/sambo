import clsx from "clsx";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { View } from "react-native";
import { Button } from "../../components/Button";
import { InputField } from "../../components/InputField";
import { OnboardingNavigationProps } from "../../navigation/onboarding";
import { trpc } from "../../utils/trpc";

type HouseHoldScreenProps = OnboardingNavigationProps;

type FormValues = {
  name: string;
};

export const CreateHouseholdScreen = ({ navigation }: HouseHoldScreenProps) => {
  const ctx = trpc.useContext();
  const createHousehold = trpc.onboarding.createHouseHold.useMutation({
    async onSuccess({ household_complete, userinfo_complete }) {
      const me = ctx.auth.me.getData();
      if (me)
        ctx.auth.me.setData({
          user: {
            ...me.user,
            onboarding: { userinfo_complete, household_complete },
          },
        });
    },
  });

  const form = useForm<FormValues>();

  const handleSubmit = form.handleSubmit(({ name }) => {
    createHousehold.mutate({ name });
  });

  return (
    <View className="h-full w-full flex flex-col p-8 justify-center">
      <FormProvider {...form}>
        <InputField
          rules={{ required: true }}
          name="name"
          label="Vad heter erat hem?"
        />
      </FormProvider>
      <View className="my-2" />
      <Button onPress={handleSubmit}>Fortsätt</Button>
    </View>
  );
};