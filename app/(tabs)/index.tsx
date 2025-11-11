import PostCard from "@/components/PostCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useColor } from "@/hooks/useColor";
import { useUserStore } from "@/store/useUserStore";
import {  lightColors } from "@/theme/colors";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function HomeScreen() {
  const user = useUserStore((state) => state.currentUser);

  const borderColor = useColor("border");
  const image: string = "";

  return (
    <SafeAreaView style={{flex: 1,}}>
      <View>
        <View style={[styles.headerContent, { borderColor }]}>
          <Text variant="heading" style={{ color: lightColors.brand }}>
            Framez
          </Text>
          <Avatar size={36}>
            {image ? (
              <AvatarImage source={{ uri: image }} />
            ) : (
              <AvatarFallback
                style={{ backgroundColor: lightColors.brand }}
                textStyle={{
                  color: "white",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                }}
              >
                {user?.name?.slice(0, 2) ?? "AB"}
              </AvatarFallback>
            )}
          </Avatar>
        </View>
        <ScrollView style={styles.allPostSection}>
          <PostCard />
          <PostCard />
          <View style={{marginBottom:250}} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContent: {
    paddingTop: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  allPostSection: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    flexDirection: "column",
    paddingBottom:300,
  },
  postCard: {
    gap: 10,
  },
  postImage: {
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
  },
  imageCard: {
    borderRadius: 8,
    width: "100%",
    height: 500,
  },
});
