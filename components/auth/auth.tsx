import { View } from "@/components/ui/view";

import { ScrollView } from "@/components/ui/scroll-view";
// import { AvoidKeyboard } from "@/components/ui/avoid-keyboard";
import { Password } from "@/components/auth/password";

export const Auth = () => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 320 }}
        keyboardShouldPersistTaps="handled"
      >
        <Password />
      </ScrollView>

      {/* <AvoidKeyboard /> */}
    </View>
  );
};
