import React, { useEffect } from "react";
import { Tabs } from "expo-router";
import { BlurView } from "expo-blur";
import {
  CirclePlus,
  Home,
  Stars,
  UserCircle2,
} from "lucide-react-native";
import { Platform, StyleSheet, useColorScheme } from "react-native";
import { PlatformPressable } from "@react-navigation/elements";
import { Authenticated, Unauthenticated, AuthLoading, useQuery } from "convex/react";
import { useColor } from "@/hooks/useColor";
import { Icon } from "@/components/ui/icon";
import { View } from "@/components/ui/view";
import { Auth } from "@/components/auth/auth";
import { Spinner } from "@/components/ui/spinner";
import * as Haptics from "expo-haptics";
import { api } from "@/convex/_generated/api";
import { useUserStore } from "@/store/useUserStore";
import { lightColors } from "@/theme/colors";

export default function TabLayout() {
  return (
    <View style={{ flex: 1 }}>
      <AuthLoading>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Spinner size="lg" variant="circle" color={lightColors.brand} />
        </View>
      </AuthLoading>

      <Unauthenticated>
        <Auth />
      </Unauthenticated>

      <Authenticated>
        <TabSubLayout />
      </Authenticated>
    </View>
  );
}

const TabSubLayout = () => {
  const primary = useColor("primary");
  const theme = useColorScheme();
  const isDark = theme === "dark";

  const setCurrentUser = useUserStore((state) => state.setCurrentUser);

  const currentUser = useQuery(api.users.getUserInfo);

    useEffect(() => {
    if (currentUser) {
      setCurrentUser(currentUser);
    }
  }, [currentUser, setCurrentUser]);
  

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingVertical: 10,
        },
        tabBarActiveTintColor: primary,
        headerShown: false,
        tabBarButton: (props) => (
          <PlatformPressable
            {...props}
            onPressIn={(ev) => {
              if (process.env.EXPO_OS === "ios") {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }
              props.onPressIn?.(ev);
            }}
          />
        ),
        tabBarBackground: () => {
          if (Platform.OS === "ios") {
            return (
              <BlurView
                tint={
                  isDark
                    ? "systemChromeMaterialDark"
                    : "systemChromeMaterialLight"
                }
                intensity={100}
                style={StyleSheet.absoluteFill}
              />
            );
          }
          return null;
        },
        tabBarStyle: {
          width: "100%",
          height: 60,
          borderTopWidth: 2,
          borderColor: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)",
          backgroundColor: isDark
            ? "rgba(20,20,20,0.9)"
            : "rgba(255,255,255,0.9)",
          alignSelf: "center",
          // shadow removed completely
          shadowColor: "transparent",
          shadowOpacity: 0,
          shadowRadius: 0,
          elevation: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name={Home} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name={CirclePlus} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name={UserCircle2} size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};
