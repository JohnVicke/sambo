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

export const CreateHouseholdScreen = ({}: HouseHoldScreenProps) => {
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
    <View className="flex h-full w-full flex-col justify-center p-8">
      <FormProvider {...form}>
        <InputField rules={{ required: true }} name="name" label="Vad heter erat hem?" />
      </FormProvider>
      <View className="my-2" />
      <Button onPress={handleSubmit}>Fortsätt</Button>
    </View>
  );
};
