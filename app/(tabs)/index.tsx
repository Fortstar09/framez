import React, { useState, useCallback } from "react";
import {
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useColor } from "@/hooks/useColor";
import { useUserStore } from "@/store/useUserStore";
import { lightColors } from "@/theme/colors";
import PostCard from "@/components/PostCard";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { router } from "expo-router";

export default function HomeScreen() {
  const user = useUserStore((state) => state.currentUser);
  const borderColor = useColor("border");
  const textColor = useColor("text");

  const [refreshing, setRefreshing] = useState(false);
  const [manualReloadKey, setManualReloadKey] = useState(0); // force reload

  // ⛔ Disable auto-live updates by using key trick
  const posts = useQuery(api.posts.getPosts);

  const handleReload = useCallback(() => {
    setRefreshing(true);
    // trigger re-render → refetch
    setManualReloadKey((prev) => prev + 1);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Header */}
      <View style={[styles.headerContent, { borderColor }]}>
        <Text variant="heading" style={{ color: lightColors.brand }}>
          Framez
        </Text>
        
        <TouchableOpacity onPress={() => router.push("/profile")}>
          <Avatar size={36}>
            {user?.image ? (
              <AvatarImage source={{ uri: user?.image }} />
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
        </TouchableOpacity>
      </View>

      {/* Posts */}
      {posts === undefined ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={lightColors.brand} />
          <Text style={{ marginTop: 10, color: textColor }}>
            Loading posts...
          </Text>
        </View>
      ) : posts.length === 0 ? (
        <View style={styles.loaderContainer}>
          <Text>No posts yet. Be the first to post!</Text>
        </View>
      ) : (
        <FlatList<PostCardProps>
          data={posts}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <PostCard
              _id={item._id}
              image={item.image}
              text={item.text}
              authorAva={item.authorAva}
              authorId={item.authorId}
              authorName={item.authorName}
              _creationTime={item._creationTime}
            />
          )}
          contentContainerStyle={styles.allPostSection}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleReload}
              colors={[lightColors.brand]}
            />
          }
          showsVerticalScrollIndicator={false}
        />
      )}
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
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  loaderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
