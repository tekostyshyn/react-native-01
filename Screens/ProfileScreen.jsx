import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { selectUserPhoto, selectUserLogin } from "../redux/auth/selectors";
import { logout } from "../redux/auth/operations";
import { selectAllPosts } from "../redux/posts/selectors";
import BackgroundImage from "../assets/background-image.jpeg";
import {
  ImageBackground,
  StyleSheet,
  View,
  Animated,
  Image,
  Text,
  Pressable,
  FlatList,
  ScrollView,
} from "react-native";

const Item = ({
  title,
  commentsAmount,
  location,
  imageUrl,
  likesAmount,
  onPressComments,
  onPressMap,
}) => (
  <View style={styles.post}>
    <Image style={styles.postImage} source={{ uri: imageUrl }}></Image>
    <Text style={styles.postText}>{title}</Text>
    <View style={styles.addInfoWrapper}>
      <Pressable style={styles.commentLikesButton} onPress={() => onPressComments()}>
        <Feather style={{ color: "#FF6C00" }} name="message-circle" size={24} />
        <Text style={{ fontSize: 16, color: "#212121" }}>{commentsAmount}</Text>
      </Pressable>
      <View style={styles.commentLikesButton}>
        <Feather style={{ color: "#FF6C00" }} name="thumbs-up" size={24} />
        <Text style={{ fontSize: 16, color: "#212121" }}>{likesAmount}</Text>
      </View>
      <Pressable style={styles.locationButton} onPress={() => onPressMap()}>
        <Feather style={{ color: "#BDBDBD" }} name="map-pin" size={24} />
        <Text style={styles.locationText}>{location}</Text>
      </Pressable>
    </View>
  </View>
);

const ProfileScreen = () => {
  const profilePhoto = useSelector(selectUserPhoto);
  const login = useSelector(selectUserLogin);
  const fetchedPosts = useSelector(selectAllPosts);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate("Login");
  };

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={BackgroundImage}
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <View style={styles.box}>
          <Animated.View style={styles.imageWrapper}>
            {profilePhoto && (
              <Image source={{ uri: profilePhoto }} style={styles.profileImage}></Image>
            )}
          </Animated.View>
          <Pressable style={styles.logoutIcon} onPress={handleLogout}>
            <Feather name="log-out" size={24} color="#BDBDBD" />
          </Pressable>
          <Text style={styles.heading}>{login}</Text>
          {fetchedPosts.length > 0 && (
            <FlatList
              data={fetchedPosts}
              renderItem={({ item }) => (
                <Item
                  title={item.name}
                  commentsAmount={item.comments.length}
                  imageUrl={item.imageUrl}
                  location={item.location.name}
                  likesAmount={item.likes}
                  onPressComments={() => {
                    navigation.navigate("Comments", { postId: item.id });
                  }}
                  onPressMap={() => {
                    navigation.navigate("Map", { location: item.location.geo.coords });
                  }}
                />
              )}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          )}
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    position: "relative",
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "white",
    marginTop: 147,
    paddingTop: 92,
    paddingLeft: 16,
    paddingRight: 16,
  },
  imageWrapper: {
    position: "absolute",
    left: "50%",
    transform: [{ translateX: -60 }, { translateY: -60 }],
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    width: 120,
    height: 120,
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  heading: {
    // font-family: Roboto;
    fontSize: 30,
    fontWeight: 500,
    textAlign: "center",
    marginBottom: 33,
  },
  logoutIcon: {
    position: "absolute",
    right: 16,
    top: 22,
    width: 24,
    height: 24,
  },
  post: {
    width: "100%",
    height: 299,
    marginBottom: 32,
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
  commentLikesButton: {
    display: "flex",
    gap: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginRight: 24,
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

export default ProfileScreen;
