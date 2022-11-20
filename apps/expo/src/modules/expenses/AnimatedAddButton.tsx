import { MotiView } from "moti";
import { Text } from "../../components/Text";
import React from "react";
import PlusIcon from "react-native-heroicons/outline/PlusIcon";
import { MotiPressable } from "moti/interactions";

type AnimatedAddButtonProps = {
  description: string;
  onPress: () => void;
};

export const AnimatedAddButton = ({ description, onPress }: AnimatedAddButtonProps) => {
  const [visibile, setVisible] = React.useState(true);
  return (
    <MotiPressable onPress={onPress}>
      <MotiView
        className="flex flex-row bg-rose-300 p-2"
        from={{ borderRadius: 10 }}
        animate={{ borderRadius: 50 }}
        transition={{ delay: 5000 }}
      >
        {visibile && (
          <MotiView
            className="mr-2"
            from={{ translateX: 0, opacity: 1 }}
            animate={{ translateX: 20, opacity: 0 }}
            transition={{ type: "timing", delay: 4800 }}
            onDidAnimate={() => {
              setVisible(false);
            }}
          >
            <Text>{description}</Text>
          </MotiView>
        )}
        <MotiView
          className="w-[24px]"
          from={{ rotateZ: "180deg" }}
          animate={{ rotateZ: "0deg" }}
          transition={{ delay: 5000 }}
        >
          <PlusIcon height={24} width={24} color="black" />
        </MotiView>
      </MotiView>
    </MotiPressable>
  );
};
