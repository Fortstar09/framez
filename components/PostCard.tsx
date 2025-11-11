import { useColor } from "@/hooks/useColor";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { View } from "./ui/view";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "./ui/text";
import { formatTimeAgo } from "@/lib/utils";
import { router } from "expo-router";

const PostCard = ({
  _id,
  authorAva,
  authorId,
  authorName,
  image,
  text,
  _creationTime,
}: PostCardProps) => {
  const cardColor = useColor("card");
  const borderColor = useColor("border");

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={()=>router.push(`/post/${_id}`)}
      style={[styles.postCard, { backgroundColor: cardColor, borderColor }]}
    >
      <View style={styles.header}>
        <Avatar size={32}>
          {authorAva ? (
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
              {authorName?.slice(0, 2) ?? "AB"}
            </AvatarFallback>
          )}
        </Avatar>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{authorName ?? "Anon"}</Text>
          <Text variant="caption" style={styles.timeText}>
            {formatTimeAgo(_creationTime)}
          </Text>
        </View>
      </View>

      <Text variant="body" style={styles.postText}>
        {text}
      </Text>

      {image && (
        <Image
          source={{ uri: image }}
          resizeMode="cover"
          style={styles.imageCard}
        />
      )}
    </TouchableOpacity>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  postCard: {
    padding: 10,
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
    borderRadius: 10,
    width: "100%",
    height: 300,
    marginTop: 8,
  },
});
