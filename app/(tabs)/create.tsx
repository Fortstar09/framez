import React, { useState } from "react";
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Alert,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Plus, Camera, Images } from "lucide-react-native";
import { Text } from "@/components/ui/text";
import { useColor } from "@/hooks/useColor";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const screenWidth = Dimensions.get("window").width;

const AddPostScreen = () => {
  const createPost = useMutation(api.posts.createPost);
  const [postText, setPostText] = useState("");
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [imageHeight, setImageHeight] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const cardColor = useColor("card");
  const borderColor = useColor("border");
  const primaryColor = useColor("primary");
  const textColor = useColor("text");
  const bgColor = useColor("background");

  const getImageDimensions = (uri: string) => {
    Image.getSize(uri, (width, height) => {
      const aspectRatio = height / width;
      setImageHeight(screenWidth * aspectRatio * 0.8); // 80% of screen width
    });
  };

  const openCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      const upimage = result.assets[0];
      setImage(upimage);
      getImageDimensions(upimage.uri);
      setIsModalVisible(false);
    } else {
      setTimeout(
        () => Alert.alert("Image picked", "You did not take any image"),
        100
      );
    }
  };

  const openPicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const upimage = result.assets[0];
      setImage(upimage);
      getImageDimensions(upimage.uri);
      setIsModalVisible(false);
    } else {
      setTimeout(
        () => Alert.alert("Image picked", "You did not select any image"),
        100
      );
    }
  };

  const handlePost = async () => {
    if (!postText.trim() && !image) {
      setIsError(true);
      Alert.alert("Error", "Please enter some text or add an image!");
      return;
    }

    try {
      setLoading(true);
      let imageUrl = "";

      // ✅ Upload to Cloudinary
      if (image) {
        const formData = new FormData();
        formData.append("file", {
          uri: image.uri,
          type: image.mimeType || "image/jpeg",
          name: image.fileName || "upload.jpg",
        } as unknown as Blob);
        formData.append("upload_preset", "framez");
        formData.append("folder", "posts");

        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dsns1khez/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await res.json();
        imageUrl = data.secure_url;
        console.log("image update", imageUrl);
      }

      // Replace with your real user data
      const userId = "current-user-id";
      const author = "Fortunate";

      // ✅ Create post in Convex
      await createPost({
        text: postText,
        image: imageUrl,
        userId,
        author,
      });

      setPostText("");
      setImage(null);
      setImageHeight(null);
      setIsError(false);
      Alert.alert("Success", "Post uploaded!");
    } catch (error) {
      console.error("Error creating post:", error);
      Alert.alert("Error", "Failed to upload post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ padding: 20, gap: 16 }}>
          <View>
            <Text variant="heading" style={{ marginBottom: 5 }}>
              Create Post
            </Text>
            <Text
              variant="caption"
              style={{ marginBottom: 20, maxWidth: "70%" }}
            >
              Write or post whatever you like, nobody cares anyway.
            </Text>
          </View>

          <TextInput
            style={[
              styles.input,
              {
                borderColor: isError ? "red" : borderColor,
                color: textColor,
                backgroundColor: cardColor,
              },
            ]}
            placeholder="What's on your mind?"
            placeholderTextColor={textColor === "#000" ? "#777" : "#aaa"}
            multiline
            value={postText}
            onChangeText={(text) => {
              setPostText(text);
              if (text.trim() !== "") setIsError(false);
            }}
          />

          <TouchableOpacity
            style={[styles.imagePicker, { borderColor }]}
            onPress={() => setIsModalVisible(true)}
          >
            {image ? (
              <Image
                source={{ uri: image.uri }}
                style={[styles.image, { height: imageHeight || 200 }]}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.placeholder}>
                <Plus size={24} color={primaryColor} />
                <Text variant="body">Add Image</Text>
              </View>
            )}
          </TouchableOpacity>

          <Button onPress={handlePost} disabled={loading} loading={loading}>
            {loading ? "Posting..." : "Post"}
          </Button>
          <View style={{ marginBottom: 50 }} />
        </ScrollView>

        {/* Image Picker Modal */}
        <Modal
          visible={isModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View
              style={[styles.modalContainer, { backgroundColor: cardColor }]}
            >
              <Text
                variant="heading"
                style={{
                  textAlign: "center",
                  marginBottom: 12,
                  color: primaryColor,
                }}
              >
                Choose Image Source
              </Text>
              <TouchableOpacity
                style={[styles.modalButton]}
                onPress={openCamera}
              >
                <Camera size={20} color={primaryColor} />
                <Text
                  variant="body"
                  style={{ fontSize: 16, color: primaryColor }}
                >
                  Use Camera
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton]}
                onPress={openPicker}
              >
                <Images size={20} color={primaryColor} />
                <Text
                  variant="body"
                  style={{ fontSize: 16, color: primaryColor }}
                >
                  Upload from Gallery
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton]}
                onPress={() => setIsModalVisible(false)}
              >
                <Text
                  variant="body"
                  style={{ fontSize: 16, color: primaryColor }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddPostScreen;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    minHeight: 100,
    fontSize: 16,
    textAlignVertical: "top",
  },
  imagePicker: {
    borderWidth: 1,
    borderRadius: 12,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholder: {
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    height: 200,
  },
  image: {
    width: "100%",
    borderRadius: 12,
  },
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
  },
});
