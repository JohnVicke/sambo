import { SafeAreaView, View, Text, Pressable } from "react-native";
import { MotiView } from "moti";
import React from "react";
import { clsx } from "clsx";
import { AnimateHeight } from "../components/animate-height";
import { ChevronDownIcon } from "react-native-heroicons/outline";
import { trpc } from "../utils/trpc";

const testUsers: User[] = [
  { firstname: "Viktor", lastname: "Malmedal", color: "#b8b7ff", id: "1" },
  {
    firstname: "Johanna",
    lastname: "Thorstensson",
    color: "#ffb4f8",
    id: "2",
  },
];

type User = {
  id: string;
  firstname: string;
  lastname: string;
  color: string;
};

const Accordion = ({
  title,
  content,
  defaultOpen = false,
}: {
  title: string;
  content: JSX.Element;
  defaultOpen?: boolean;
}) => {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <View className="rounded-md bg-white p-2">
      <Pressable onPress={() => setOpen(!open)}>
        <View className="flex flex-row items-center justify-between">
          <Text className="text-lg font-medium">{title}</Text>
          <MotiView animate={{ rotateZ: open ? "-180deg" : "0deg" }} transition={{ type: "spring", damping: 12 }}>
            <ChevronDownIcon color="#000" size="24" />
          </MotiView>
        </View>
      </Pressable>
      <AnimateHeight enterFrom="bottom" hide={!open}>
        <Text>{content}</Text>
      </AnimateHeight>
    </View>
  );
};

const Avatar = ({ firstname, lastname, color }: User) => {
  const initials = `${firstname[0].toUpperCase()}${lastname[0].toUpperCase()}`;
  const bg = `bg-[${color}]`;
  return (
    <View className={clsx(bg, "h-8 w-8 items-center justify-center rounded-full")}>
      <Text>{initials}</Text>
    </View>
  );
};

const Avatars = () => (
  <View className="flex flex-row">
    {testUsers.map(user => (
      <Avatar {...user} key={user.id} />
    ))}
  </View>
);

export const PlanningScreen = () => {
  const { data, isLoading } = trpc.household.get.useQuery();

  if (isLoading || !data?.household) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <View className="h-full w-full p-4">
        <View className="flex flex-row justify-between p-4">
          <Text className="text-2xl font-bold">{data.household?.name}</Text>
          <Avatars />
        </View>
        <Accordion title="Måndag" content={<Avatar {...testUsers[0]} />} />
      </View>
    </SafeAreaView>
  );
};
