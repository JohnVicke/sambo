import React from "react";

import clsx from "clsx";
import { Text as RNText } from "react-native";

type TextVariant = "h1" | "h2" | "h3" | "p" | "overline";

const styles: { [key in TextVariant]: string } = {
  h1: "font-poppinsBold text-4xl",
  h2: "font-poppinsMedium text-2xl",
  h3: "font-poppins text-xl",
  p: "font-poppins",
  overline: "font-poppins tracking-widest uppercase",
};

type TextProps = React.PropsWithChildren & {
  variant?: TextVariant;
  bold?: boolean;
  medium?: boolean;
  size?: number;
  color?: string;
};

export const Text = ({ size, color, bold, medium, children, variant = "p" }: TextProps) => (
  <RNText
    className={clsx(
      "tracking-wide",
      styles[variant],
      {
        [`text-[${size}px]`]: !!size,
        "font-poppinsBold": bold,
        "font-poppinsMedium": medium,
      },
      color,
    )}
  >
    {children}
  </RNText>
);
