import React from "react";
import { Button, TextInput, View, SafeAreaView } from "react-native";
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

  const signIn = trpc.auth.signIn.useMutation({
    async onSuccess({ accessToken }) {
      setToken(accessToken);
      ctx.auth.me.invalidate();
    },
  });

  const signUp = trpc.auth.signUp.useMutation({
    async onSuccess({ accessToken }) {
      setToken(accessToken);
      ctx.auth.me.invalidate();
    },
  });

  const onSubmitSignUp: SubmitHandler<FormValues> = ({ email }) => {
    signUp.mutate({ email });
  };

  const onSubmitSignIn: SubmitHandler<FormValues> = ({ email }) => {
    signIn.mutate({ email });
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
            className="w-full border-2 border-gray-800 p-2"
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
      />
      <Button onPress={handleSubmit(onSubmitSignUp)} title="sign up" />
      <Button onPress={handleSubmit(onSubmitSignIn)} title="sign in" />
    </View>
  );
};

export const Auth = () => (
  <SafeAreaView className="flex h-full w-full flex-col items-center justify-center">
    <View className="my-2" />
    <SignUp />
  </SafeAreaView>
);
