import React, { useRef } from "react";

import clsx from "clsx";
import { AnimatePresence, MotiView } from "moti";
import { TouchableOpacity, View, TextInput } from "react-native";
import { Text } from "./Text";
import { InputField } from "./InputField";

export const CodeText = ({ code, length, name }: { name: string; code?: string; length: number }) => {
  const ref = useRef<TextInput>(null);
  const current = code?.length ?? 0;

  const focusInput = () => ref.current?.focus();

  return (
    <View>
      <InputField ref={ref} hidden maxLength={length} rules={{ maxLength: length }} name={name} />
      <TouchableOpacity onPress={focusInput}>
        <MotiView className="flex flex-row">
          {Array.from({ length }).map((_, i) => (
            <View
              key={`${i}-`}
              className={clsx("mx-2 flex h-16 w-16 items-center justify-center rounded-md bg-gray-300 p-4", {
                "bg-gray-400": current === i,
              })}
            >
              <AnimatePresence>
                {code?.[i] && (
                  <MotiView from={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <Text variant="h1">{code[i]}</Text>
                  </MotiView>
                )}
              </AnimatePresence>
            </View>
          ))}
        </MotiView>
      </TouchableOpacity>
    </View>
  );
};
