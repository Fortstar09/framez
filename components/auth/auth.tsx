import { ScrollView } from "@/components/ui/scroll-view";
// import { AvoidKeyboard } from "@/components/ui/avoid-keyboard";
import { Password } from "@/components/auth/password";
import { SafeAreaView } from "react-native-safe-area-context";

export const Auth = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center" }}
    >
      <Password />
    </SafeAreaView>
  );
};
