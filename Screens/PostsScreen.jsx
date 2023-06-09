import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Image, Text, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";

const PostsScreen = () => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <View style={styles.profileWrapper}>
        <Image style={styles.profilePhoto}></Image>
        <View style={styles.profileTextWrapper}>
          <Text style={styles.profileName}>Natali Romanova</Text>
          <Text style={styles.profileEmail}>email@example.com</Text>
        </View>
      </View>
      <View style={styles.post}>
        <Image style={styles.postImage}></Image>
        <Text style={styles.postText}>Ліс</Text>
        <View style={styles.addInfoWrapper}>
          <Pressable
            style={styles.commentButton}
            onPress={() => {
              navigation.navigate("Comments");
            }}
          >
            <Feather style={styles.addInfoIcon} name="message-circle" size={24} />
            <Text style={styles.commentText}>0</Text>
          </Pressable>
          <Pressable
            style={styles.locationButton}
            onPress={() => {
              navigation.navigate("Map");
            }}
          >
            <Feather style={styles.addInfoIcon} name="map-pin" size={24} />
            <Text style={styles.locationText}>Ivano-Frankivs'k Region, Ukraine</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
  },
  post: {
    width: "100%",
    height: 299,
    marginBottom: 32,
  },
  profileWrapper: {
    width: "100%",
    marginBottom: 32,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 8,
  },
  profilePhoto: {
    height: 60,
    width: 60,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  profileTextWrapper: {},
  profileName: {
    // font-family: Roboto;
    fontSize: 13,
    fontWeight: 700,
  },
  profileEmail: {
    // font-family: Roboto;
    fontSize: 11,
  },
  postImage: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    marginBottom: 8,
  },
  postText: {
    // font-family: Roboto;
    fontSize: 16,
    fontWeight: 500,
    marginBottom: 8,
  },
  addInfoWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addInfoIcon: {
    color: "#BDBDBD",
  },
  commentButton: {
    display: "flex",
    gap: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  commentText: {
    // font-family: Roboto;
    fontSize: 16,
    color: "#BDBDBD",
  },
  locationButton: {
    display: "flex",
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  locationText: {
    // font-family: Roboto;
    fontSize: 16,
    color: "#212121",
    textDecorationLine: "underline",
  },
});

export default PostsScreen;
