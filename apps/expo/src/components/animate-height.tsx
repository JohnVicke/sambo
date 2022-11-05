import React from "react";
import { MotiView, useDynamicAnimation } from "moti";
import { StyleSheet, Platform } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { View } from "react-native";

type Props = {
  children?: React.ReactNode;
  hide?: boolean;
  onHeightDidAnimate?: (height: number) => void;
  enterFrom?: "bottom" | "top";
  initialHeight?: number;
} & React.ComponentProps<typeof MotiView>;

function AnimateHeight({
  children,
  hide = false,
  style,
  delay = Platform.select({ web: 250, default: 0 }),
  transition = { type: "timing", delay },
  onHeightDidAnimate,
  initialHeight = 0,
  ...motiViewProps
}: Props) {
  const measuredHeight = useSharedValue(initialHeight);
  const state = useDynamicAnimation(() => ({
    height: initialHeight,
    opacity: !initialHeight || hide ? 0 : 1,
  }));
  if ("state" in motiViewProps) {
    console.warn("[AnimateHeight] state prop not supported");
  }

  return (
    <MotiView
      {...motiViewProps}
      state={state}
      transition={transition}
      onDidAnimate={
        onHeightDidAnimate &&
        ((key, _finished, _, { attemptedValue }) => key == "height" && onHeightDidAnimate(attemptedValue as number))
      }
      style={[styles.hidden, style]}
    >
      <View
        style={[
          StyleSheet.absoluteFill,
          styles.autoBottom,

          // THIS BREAKS IDK WHY, so ignore that prop
          // enterFrom === 'top' ? styles.autoBottom : styles.autoTop,
        ]}
        onLayout={({ nativeEvent }) => {
          measuredHeight.value = nativeEvent.layout.height;
        }}
      >
        {children}
      </View>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  autoBottom: {
    bottom: "auto",
  },
  autoTop: {
    top: "auto",
  },
  hidden: {
    overflow: "hidden",
  },
});

export { AnimateHeight };
