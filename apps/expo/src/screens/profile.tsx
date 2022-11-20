import React, { useState } from "react";
import { Button, Image, View } from "react-native";
import { Text } from "../components/Text";
import { DefaultLayout } from "../modules/layouts/DefaultLayout";
import { MainNavigatorProps } from "../navigation/main";
import { trpc } from "../utils/trpc";
import * as ImagePicker from "expo-image-picker";

type ProfileScreenProps = MainNavigatorProps;

export const ProfileScreen = (props: ProfileScreenProps) => {
  const { data, isLoading } = trpc.user.me.useQuery();
  const presignedUrl = trpc.imageService.presignedUrl.useMutation();
  const [image, setImage] = useState("");

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.cancelled) {
        console.log({ result });
        setImage(result.uri);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading || !data) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <DefaultLayout>
      {image && <Image source={{ uri: image }} className="h-24 w-24" />}
      <Button title="Välj bild" onPress={pickImage} />
      <Text>{data.name}</Text>
    </DefaultLayout>
  );
};
