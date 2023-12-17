import { SafeAreaView, Text } from "react-native";

import { LinkButton } from "@/components/ui/linkButton";

export default function Page() {
  return (
    <SafeAreaView>
      <Text>Home Screen</Text>
      <LinkButton title="About" href="/about" />
    </SafeAreaView>
  );
}
