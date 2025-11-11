import React from "react";
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Text } from "@/components/ui/text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useColor } from "@/hooks/useColor";
import { formatTimeAgo } from "@/lib/utils";
import { ArrowLeft } from "lucide-react-native";
import { Id } from "@/convex/_generated/dataModel";
import { lightColors } from "@/theme/colors";
import { Spinner } from "@/components/ui/spinner";
import { SafeAreaView } from "react-native-safe-area-context";

const PostDetails = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  // Fetch post by ID
  const post = useQuery(api.posts.getPostById, {
    id: id as unknown as Id<"posts">,
  });

  const bgColor = useColor("background");
  const textColor = useColor("text");
  const cardColor = useColor("card");
  const borderColor = useColor("border");

  if (!post) {
    return <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Spinner size="lg" variant="circle" color={lightColors.brand} />
    </View>;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        {/* Header */}
        <View style={[styles.header, { borderColor } ]}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={[styles.backButton, { borderColor }]}
          >
            <ArrowLeft color={textColor} size={20} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: textColor }]}>Post</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Post Info */}
        <View style={[styles.postContainer]}>
          <View style={styles.authorSection}>
            <Avatar size={40}>
              {post.authorAva ? (
                <AvatarImage source={{ uri: post.authorAva }} />
              ) : (
                <AvatarFallback
                  style={{ backgroundColor: "#10b981" }}
                  textStyle={{
                    color: "white",
                    fontWeight: "bold",
                    textTransform: "capitalize",
                  }}
                >
                  {post.authorName?.slice(0, 2) ?? "AB"}
                </AvatarFallback>
              )}
            </Avatar>
            <View style={styles.userInfo}>
              <Text style={[styles.authorName, { color: textColor }]}>
                {post.authorName}
              </Text>
              <Text variant="caption" style={styles.timeText}>
                {formatTimeAgo(post._creationTime)}
              </Text>
            </View>
          </View>

          {/* Post Content */}
          <Text style={[styles.postText, { color: textColor }]}>
            {post.text}
          </Text>

          {/* Post Image */}
          {post.image && (
            <Image
              source={{ uri: post.image }}
              resizeMode="cover"
              style={[styles.image, {borderColor}]}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PostDetails;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 10,
    borderBottomWidth:1,
  },
  backButton: {
    width: 30,
    height: 30,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  postContainer: {
    borderRadius: 16,
    margin: 16,
    padding: 16,
    gap: 10,
  },
  authorSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  userInfo: {
    flexDirection: "column",
  },
  authorName: {
    fontSize: 16,
    fontWeight: "600",
  },
  timeText: {
    fontSize: 12,
    opacity: 0.6,
  },
  postText: {
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    marginTop: 20,
    borderWidth:1,
  },
});
