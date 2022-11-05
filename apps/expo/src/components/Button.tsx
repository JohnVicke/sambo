import clsx from "clsx";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "./Text";

type ButtonVariant = "outlined" | "filled";

const styles: { [key in ButtonVariant]: string } = {
  filled: "bg-[#FF9E9E] w-fit",
  outlined: "border-2 border-[#FF9E9E]",
};

type ButtonProps = React.PropsWithChildren & {
  onPress: () => void;
  variant?: "outlined" | "filled";
};

export const Button = ({ onPress, children, variant = "filled" }: ButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    className={clsx("flex items-center justify-center rounded-md p-2", styles[variant])}
  >
    <Text bold>{children}</Text>
  </TouchableOpacity>
);
