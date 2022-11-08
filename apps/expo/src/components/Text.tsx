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
  xl?: boolean;
  color?: string;
  sm?: boolean;
};

export const Text = ({ xl, color, sm, bold, medium, children, variant = "p" }: TextProps) => (
  <RNText
    className={clsx(styles[variant], "tracking-wide", color, {
      "font-poppinsBold": bold,
      "font-poppinsMedium": medium,
      "text-4xl": !!xl,
      "text-xs": !!sm,
    })}
  >
    {children}
  </RNText>
);
