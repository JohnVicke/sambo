import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { View, Text } from "react-native";
import { Auth } from "../components/auth";
import { Button } from "../components/Button";
import { CodeText } from "../components/CodeText";
import { trpc } from "../utils/trpc";
import { MainNavigator } from "./main";
import { OnboardingNavigator } from "./onboarding";

const VerifyCodeScreen = () => {
  const ctx = trpc.useContext();
  const verifyCode = trpc.auth.verifyCode.useMutation({
    async onSuccess({ emailVerified }) {
      const me = ctx.auth.me.getData();
      if (me?.user) ctx.auth.me.setData({ user: { ...me.user, emailVerified } });
    },
  });

  const form = useForm<{ code: string }>();
  const code = form.watch("code");

  const onSubmit = form.handleSubmit(({ code }) => {
    verifyCode.mutate({ code });
  });

  return (
    <View className="flex h-full w-full flex-col items-center justify-center p-8">
      <FormProvider {...form}>
        <CodeText code={code} length={4} name="code" />
        <View className="mt-4 w-full">
          <Button onPress={onSubmit}>Verifiera</Button>
        </View>
      </FormProvider>
    </View>
  );
};

export const AuthenticationSwitch = () => {
  const { data, isLoading } = trpc.auth.me.useQuery();

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!data?.user) {
    return (
      <View>
        <Auth />
      </View>
    );
  }

  const { user } = data;

  if (!user.emailVerified) {
    return <VerifyCodeScreen />;
  }

  if (!user.onboarding?.userinfoComplete || !user.onboarding?.householdComplete) {
    return <OnboardingNavigator />;
  }

  return <MainNavigator />;
};
