import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Image, Text, Pressable, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import { selectUserId, selectUserLogin, selectUserEmail } from "../redux/auth/selectors";
import { selectAllPosts } from "../redux/posts/selectors";
import { getPosts } from "../redux/posts/operations";

const Item = ({ title, commentsAmount, location, imageUrl, onPressComments, onPressMap }) => (
  <View style={styles.post}>
    <Image style={styles.postImage} source={{ uri: imageUrl }}></Image>
    <Text style={styles.postText}>{title}</Text>
    <View style={styles.addInfoWrapper}>
      <Pressable style={styles.commentButton} onPress={() => onPressComments()}>
        <Feather style={styles.addInfoIcon} name="message-circle" size={24} />
        <Text style={styles.commentText}>{commentsAmount}</Text>
      </Pressable>
      <Pressable style={styles.locationButton} onPress={() => onPressMap()}>
        <Feather style={styles.addInfoIcon} name="map-pin" size={24} />
        <Text style={styles.locationText}>{location}</Text>
      </Pressable>
    </View>
  </View>
);

const PostsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const email = useSelector(selectUserEmail);
  const login = useSelector(selectUserLogin);
  const fetchedPosts = useSelector(selectAllPosts);

  useEffect(() => {
    if (!userId) return;
    dispatch(getPosts(userId));
  }, [userId]);

  return (
    <View style={styles.container}>
      <View style={styles.profileWrapper}>
        <Image style={styles.profilePhoto}></Image>
        <View style={styles.profileTextWrapper}>
          <Text style={styles.profileName}>{login}</Text>
          <Text style={styles.profileEmail}>{email}</Text>
        </View>
      </View>
      {fetchedPosts.length > 0 && (
        <FlatList
          data={fetchedPosts}
          renderItem={({ item }) => (
            <Item
              title={item.name}
              commentsAmount={item.comments.length}
              imageUrl={item.imageUrl}
              location={item.location.name}
              onPressComments={() => {
                navigation.navigate('Comments')
              }}
              onPressMap={() => {
                navigation.navigate('Map')
              }}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
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
    marginLeft: "auto",
  },
  locationText: {
    // font-family: Roboto;
    fontSize: 16,
    color: "#212121",
    textDecorationLine: "underline",
  },
});

export default PostsScreen;
