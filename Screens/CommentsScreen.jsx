import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts } from "../redux/posts/selectors";
import { selectUserId } from "../redux/auth/selectors";
import { addComment } from "../redux/posts/operations";
import {
  StyleSheet,
  View,
  Image,
  FlatList,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

const Item = ({ authorProfilePic, text, date }) => (
  <View style={styles.commentWrapper}>
    <Image source={{ uri: authorProfilePic }} style={styles.profileImg}></Image>
    <View style={styles.textWrapper}>
      <Text style={styles.text}>{text}</Text>
      <Text style={styles.date}>{date}</Text>
    </View>
  </View>
);

const CommentsScreen = ({ route }) => {
  const { postId } = route.params;
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const allPosts = useSelector(selectAllPosts);
  const userId = useSelector(selectUserId);
  const filteredPost = allPosts.filter((post) => post.id === postId)[0];
  const imageUrl = filteredPost.imageUrl;
  const comments = filteredPost.comments;

  const getDate = (dateInMs) => {
    const date = new Date(Number(dateInMs));
    return date.toLocaleString("uk-UA", { timeZone: "UTC" });
  };

  const handleComment = () => {
    if (!inputValue) return;
    dispatch(
      addComment({
        userId,
        postId,
        newComment: { text: inputValue, id: Date.now() },
      })
    );
    setInputValue("");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {filteredPost && (
          <View style={styles.container}>
            <ScrollView>
              <Image source={{ uri: imageUrl }} style={styles.image}></Image>
              <FlatList
                data={comments}
                renderItem={({ item }) => (
                  <Item authorProfilePic={item.author} text={item.text} date={getDate(item.id)} />
                )}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
              />
            </ScrollView>
            <View style={styles.inputWrapper}>
              <TextInput
                value={inputValue}
                onChangeText={setInputValue}
                style={styles.input}
                placeholder="Коментувати..."
              />
              <Pressable style={styles.inputButton} onPress={handleComment}>
                <Svg
                  width={34}
                  height={34}
                  viewBox="0 0 34 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Circle cx={17} cy={17} r={17} fill="#FF6C00" />
                  <Path
                    d="M17 10l.354-.354a.5.5 0 00-.708 0L17 10zm4.646 5.354a.5.5 0 00.708-.708l-.708.708zm-10-.708a.5.5 0 00.708.708l-.708-.708zM16.5 24a.5.5 0 001 0h-1zm.146-13.646l5 5 .708-.708-5-5-.708.708zm0-.708l-5 5 .708.708 5-5-.708-.708zM16.5 10v7h1v-7h-1zm0 7v7h1v-7h-1z"
                    fill="#fff"
                  />
                </Svg>
              </Pressable>
            </View>
          </View>
        )}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    backgroundColor: "#FFFFFF",
    paddingTop: 32,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  image: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginBottom: 32,
  },
  commentWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    marginBottom: 24,
  },
  profileImg: {
    height: 28,
    width: 28,
    borderRadius: 10,
    marginRight: 16,
  },
  textWrapper: {
    width: "100%",
    backgroundColor: "#00000008",
    borderRadius: 6,
    borderBottomLeftRadius: 0,
    padding: 16,
  },
  text: {
    // font-family: Roboto;
    fontSize: 13,
    color: "#212121",
    marginBottom: 8,
    width: "100%",
  },
  date: {
    // font-family: Roboto;
    fontSize: 10,
    color: "#BDBDBD",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 100,
    padding: 16,
    fontSize: 16,
  },
  inputWrapper: {
    width: "100%",
    height: 60,
    paddingTop: 10,
    position: "relative",
  },
  inputButton: {
    position: "absolute",
    width: 34,
    height: 34,
    bottom: 8,
    right: 8,
  },
});

export default CommentsScreen;
