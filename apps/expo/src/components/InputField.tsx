import clsx from "clsx";
import React from "react";
import { useController, UseControllerProps } from "react-hook-form";
import { TextInput, TextInputProps as RNTextInputProps, View } from "react-native";
import { Text } from "./Text";

interface InputFieldProps extends RNTextInputProps, UseControllerProps {
  label?: string;
  hidden?: boolean;
  defaultValue?: string;
}

export const InputField = React.forwardRef<TextInput, InputFieldProps>(
  ({ hidden, label, name, rules, defaultValue, ...inputProps }, ref) => {
    const {
      field: { onBlur, onChange, value },
    } = useController({ name, rules, defaultValue });

    return (
      <View className="flex flex-col">
        <Text className="mr-auto">{label}</Text>
        <TextInput
          ref={ref}
          keyboardType="email-address"
          className={clsx("w-full border-b-2 p-2", {
            "h-0 p-0 m-0 opacity-0": hidden,
          })}
          onBlur={onBlur}
          onChangeText={value => onChange(value)}
          value={value}
          {...inputProps}
        />
      </View>
    );
  },
);
