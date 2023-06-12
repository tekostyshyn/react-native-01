import React from "react";
import { useDispatch } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { Pressable, View, StyleSheet } from "react-native";
import { HeaderBackButton } from "@react-navigation/elements";
import { logout } from "../redux/auth/operations";
import Svg, { Path } from "react-native-svg";
import CreatePostsScreen from "./CreatePostsScreen";
import PostsScreen from "./PostsScreen";
import ProfileScreen from "./ProfileScreen";

const Home = () => {
  const Tabs = createBottomTabNavigator();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate("Login");
  };

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
        tabBarStyle: {
          height: 83,
          shadowColor: "#0000004D",
          shadowOffset: {
            width: 0,
            height: -0.5,
          },
        },
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: 500,
          fontSize: 17,
          lineHeight: 22,
          color: "#212121",
        },
        headerStyle: {
          shadowColor: "#0000004D",
          shadowOffset: {
            width: 0,
            height: 0.5,
          },
        },
      })}
    >
      <Tabs.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          title: "Публікації",
          headerRight: () => (
            <Pressable style={{ width: 24, height: 24, marginRight: 10 }} onPress={handleLogout}>
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          headerLeft: () => (
            <HeaderBackButton
              onPress={() => {
                navigation.navigate("Home", {
                  screen: "Posts",
                });
              }}
            />
          ),
          title: "Створити публікацію",
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
