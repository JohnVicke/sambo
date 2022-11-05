import React, { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { TextInput, View, TouchableOpacity, Text } from "react-native";
import { Auth } from "../components/auth";
import { Button } from "../components/Button";
import { InputField } from "../components/InputField";
import { CodeText } from "../components/CodeText";
import { trpc } from "../utils/trpc";
import { MainNavigator } from "./main";
import { OnboardingNavigator } from "./onboarding";

type AuthSwitchProps = {};

const VerifyCodeScreen = () => {
  const ctx = trpc.useContext();
  const verifyCode = trpc.auth.verifyCode.useMutation({
    async onSuccess({ email_verified }) {
      const me = ctx.auth.me.getData();
      if (me?.user)
        ctx.auth.me.setData({ user: { ...me.user, email_verified } });
    },
  });

  const form = useForm<{ code: string }>();
  const code = form.watch("code");

  const onSubmit = form.handleSubmit(({ code }) => {
    verifyCode.mutate({ code });
  });

  return (
    <View className="flex p-8 flex-col h-full w-full items-center justify-center">
      <FormProvider {...form}>
        <CodeText code={code} length={4} name="code" />
        <View className="w-full mt-4">
          <Button onPress={onSubmit}>Verifiera</Button>
        </View>
      </FormProvider>
    </View>
  );
};

export const AuthenticationSwitch = ({ }: AuthSwitchProps) => {
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

  if (!user.email_verified) {
    return <VerifyCodeScreen />;
  }

  if (
    !user.onboarding?.userinfo_complete ||
    !user.onboarding?.household_complete
  ) {
    return <OnboardingNavigator />;
  }

  return <MainNavigator />;
};
