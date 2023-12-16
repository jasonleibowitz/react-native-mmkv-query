import { Text, View } from "react-native";

import { LinkButton } from "@/components/ui/linkButton";

export default function Page() {
  return (
    <View>
      <Text>Home Screen</Text>
      <LinkButton title="About" href="/about" />
    </View>
  );
}
