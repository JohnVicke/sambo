import React, { useState } from "react";
import {
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { setToken, trpc } from "../utils/trpc";

type FormValues = {
  email: string;
  password: string;
};

const SignUp = () => {
  const ctx = trpc.useContext();
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: { email: "viktormalmedal@gmail.com", password: "hello123!" },
  });

  const signUp = trpc.auth.signUp.useMutation({
    async onSuccess({ accessToken }) {
      setToken(accessToken);
      ctx.auth.me.invalidate();
    },
  });

  const onSubmit: SubmitHandler<FormValues> = ({ email }) => {
    signUp.mutate({ email });
  };

  return (
    <View className="flex flex-col ">
      <Controller
        control={control}
        name="email"
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            keyboardType="email-address"
            className="w-full border-gray-800 border-2 p-2"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
      />
      <Button onPress={handleSubmit(onSubmit)} title="sign up" />
    </View>
  );
};

export const Auth = () => {
  return (
    <SafeAreaView className="flex flex-col items-center justify-center h-full w-full">
      <View className="my-2" />
      <SignUp />
    </SafeAreaView>
  );
};