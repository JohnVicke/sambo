import React from "react";

import clsx from "clsx";
import { Text as RNText } from "react-native";

type TextVariant = "h1" | "h2" | "h3" | "p";

const styles: { [key in TextVariant]: string } = {
  h1: "font-poppinsBold text-3xl",
  h2: "font-poppinsMedium text-2xl",
  h3: "font-poppins text-xl",
  p: "font-poppins",
};

type TextProps = React.PropsWithChildren & {
  variant?: TextVariant;
  bold?: boolean;
  medium?: boolean;
  className?: string;
};

export const Text = ({
  className,
  bold,
  children,
  variant = "p",
}: TextProps) => (
  <RNText
    className={clsx("tracking-wide", styles[variant], {
      "font-poppinsBold": bold,
      [`${className}`]: !!className,
    })}
  >
    {children}
  </RNText>
);
