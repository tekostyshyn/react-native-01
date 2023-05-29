import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { Pressable, View, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import CreatePostsScreen from "./CreatePostsScreen";
import PostsScreen from "./PostsScreen";
import ProfileScreen from "./ProfileScreen";

const Home = () => {
  const Tabs = createBottomTabNavigator();
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Posts") {
            return <Feather name="grid" size={24} color="#212121CC" />;
          } else if (route.name === "Profile") {
            return <Feather name="user" size={24} color="#212121CC" />;
          } else if (route.name === "CreatePosts") {
            return (
              <View style={styles.icon}>
                <Svg
                  width={13}
                  height={13}
                  viewBox="0 0 13 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7 0H6v6H0v1h6v6h1V7h6V6H7V0z"
                    fill="#FFFFFF"
                  />
                </Svg>
              </View>
            );
          }
        },
        tabBarShowLabel: false,
      })}
    >
      <Tabs.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          title: "Публікації",
          headerRight: () => (
            <Pressable style={{ width: 24, height: 24, marginRight: 10 }}>
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </Pressable>
          ),
          headerStyle: {
            shadowColor: "#0000004D",
            shadowOffset: {
              width: 0,
              height: 0.5,
            },
          },
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: 500,
            fontSize: 17,
            lineHeight: 22,
            color: "#212121",
          },
          tabBarStyle: {
            height: 83,
            shadowColor: "#0000004D",
            shadowOffset: {
              width: 0,
              height: -0.5,
            },
          },
        }}
      />
      <Tabs.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          title: "Створити публікацію",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: 500,
            fontSize: 17,
            lineHeight: 22,
            color: "#212121",
          },
          tabBarStyle: { display: "none" },
        }}
      />
      <Tabs.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    backgroundColor: "#FF6C00",
    width: 70,
    height: 40,
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
