import { router } from "expo-router";
import { Button as RNButton } from "react-native";

type LinkButtonProps = { title: string; href: string };
export const LinkButton = ({ title, href }: LinkButtonProps) => {
  return <RNButton title={title} onPress={() => router.push(href)} />;
};
