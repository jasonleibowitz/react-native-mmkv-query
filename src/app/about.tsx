import { Text, View } from "react-native";

import { LinkButton } from "@/components/ui/linkButton";

export default function Page() {
  return (
    <View>
      <Text>About Screen</Text>
      <LinkButton href="/" theme="active">
        Go Home
      </LinkButton>
    </View>
  );
}
