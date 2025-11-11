import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { useColor } from "@/hooks/useColor";
import { useUserStore } from "@/store/useUserStore";
import { lightColors } from "@/theme/colors";
import { LogOut } from "lucide-react-native";
import { ModeToggle } from "@/components/ui/mode-toggle";
import PostCard from "@/components/PostCard";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "expo-router";

const ProfileScreen = () => {
  const user = useUserStore((state) => state.currentUser);
  const router = useRouter();
  const { signOut } = useAuthActions();

  const primaryColor = useColor("primary");
  const textColor = useColor("text");
  const cardColor = useColor("card");
  const bgColor = useColor("background");

  const posts = useQuery(
    api.posts.getUserPosts,
    user?._id ? { authorId: user._id } : "skip"
  );

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSignOut = async () => {
    const clearUser = useUserStore.getState().clearUser;

    try {
      await signOut();
      clearUser();
      router.dismissAll();
    } catch (error) {
      console.error("Sign out error:", error);
      Alert.alert("Failed to sign out");
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      {/* Header Section */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <ModeToggle variant="outline" />
        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
          <LogOut color={lightColors.red} size={20} />
        </TouchableOpacity>
      </View>

      {/* User Info Section */}
      <View style={styles.header}>
        {user?.image ? (
          <View style={styles.avatarContainer}>
            <Image source={{ uri: user.image }} style={styles.avatarImage} />
          </View>
        ) : (
          <View style={styles.avatarFallback}>
            <Text style={styles.avatarFallbackText}>
              {user?.name?.slice(0, 2)?.toUpperCase() ?? "AB"}
            </Text>
          </View>
        )}
        <View style={styles.userInfo}>
          <Text variant="heading" style={{ fontSize: 24, textAlign: "center", marginTop: 8 }}>
            {user?.name ?? "Anonymous"}
          </Text>
          <Text variant="caption" style={{ color: textColor, opacity: 0.6 }}>
            {user?.email ?? "noemail@example.com"}
          </Text>
          <View style={styles.infoBox}>
            <Text variant="heading" style={{ color: primaryColor, fontSize: 20 }}>
              {posts?.length}
            </Text>
            <Text variant="body" style={{ color: textColor, opacity: 0.7 }}>
              {posts?.length === 1 ? "Post" : "Posts"}
            </Text>
          </View>
        </View>
      </View>

      {/* Posts Section */}
      <View style={styles.postList}>
        <Text variant="body" style={{ fontSize: 20, marginVertical: 10 }}>
          Your Posts
        </Text>
        <FlatList<PostCardProps>
          data={posts}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <PostCard
              _id={item._id}
              image={item.image}
              text={item.text}
              authorAva={item.authorAva ?? ""}
              authorId={item.authorId}
              authorName={item.authorName}
              _creationTime={item._creationTime}
            />
          )}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View style={{ alignItems: "center", marginTop: 20 }}>
              <Text variant="body" style={{ color: textColor }}>
                No posts yet
              </Text>
            </View>
          )}
        />
      </View>

      {/* Logout Confirmation Modal */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={[styles.modalContainer, { backgroundColor: cardColor }]}>
            <Text
              variant="heading"
              style={{
                fontSize:24,
                textAlign: "center",
                marginBottom: 12,
                color: primaryColor,
              }}
            >
              Are you sure you want to logout?
            </Text>

            <TouchableOpacity
              style={[styles.modalButton, {backgroundColor:'#9E0031'}]}
              onPress={() => {
                setIsModalVisible(false);
                handleSignOut();
              }}
            >
              <Text variant="body" style={{ fontSize: 16, color:'#fff' }}>
                Yes
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text variant="body" style={{ fontSize: 16, color: primaryColor }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { alignItems: "center", justifyContent: "center", gap: 4 },
  avatarContainer: {
    width: 60,
    height: 60,
    backgroundColor: lightColors.brand,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: lightColors.brand,
  },
  avatarImage: { width: 60, height: 60, borderRadius: 8, borderWidth: 1, borderColor: lightColors.brand },
  avatarFallback: {
    width: 60,
    height: 60,
    backgroundColor: lightColors.brand,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: lightColors.brand,
  },
  avatarFallbackText: { fontSize: 32, textTransform: "uppercase", color: "white", fontWeight: "bold", textAlign: "center" },
  userInfo: { flexDirection: "column", gap: 2, marginBottom: 12 },
  infoBox: { alignSelf: "center", flexDirection: "row", gap: 6, paddingVertical: 5, alignItems: "flex-end", marginHorizontal: 5 },
  postList: { flex: 1 },
  postCard: { borderWidth: 1, borderRadius: 12, padding: 12, marginBottom: 12 },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: 280,
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  modalButton: {
    flexDirection: "row",
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
