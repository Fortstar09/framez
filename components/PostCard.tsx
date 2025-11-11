import { useColor } from "@/hooks/useColor";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { View } from "./ui/view";
import { Image, StyleSheet } from "react-native";
import { Text } from "./ui/text";
import { images } from "@/constants";
import { useUserStore } from "@/store/useUserStore";

const PostCard = () => {
  const user = useUserStore((state) => state.currentUser);

  const cardColor = useColor("card");
  const borderColor = useColor("border");
  // Replace with real image if exists
  const image: string = "";

  return (
    <View style={[styles.postCard, { backgroundColor: cardColor, borderColor }]}>
      <View style={styles.header}>
        <Avatar size={32}>
          {image ? (
            <AvatarImage source={{ uri: image }} />
          ) : (
            <AvatarFallback
              style={{ backgroundColor: "#10b981" }}
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
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user?.name ?? "Username"}</Text>
          <Text variant="caption" style={styles.timeText}>
            2 mins ago
          </Text>
        </View>
      </View>

      <Text variant="body" style={styles.postText}>
        A glimpse into the world where creativity knows no bounds, where
        every pixel tells a story, and imagination paints realities we’ve never
        seen before.
      </Text>

      {images.clear1 && (
        <Image
          source={images.clear4}
          resizeMode="cover"
          style={styles.imageCard}
        />
      )}
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  postCard: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 16,
    marginVertical: 8,
    gap: 10,
  },
  header: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  userInfo: {
    flexDirection: "column",
    justifyContent: "center",
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
  },
  timeText: {
    fontSize: 12,
    opacity: 0.6,
  },
  postText: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
  imageCard: {
    borderRadius: 18,
    width: "100%",
    height: 300,
    marginTop: 8,
  },
});
