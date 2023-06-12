import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../redux/posts/operations";
import { selectUserId } from "../redux/auth/selectors";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  Pressable,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
import { Feather } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

const CreatePostsScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photoUri, setPhotoUri] = useState(null);
  const [name, setName] = useState("");
  const [location, setLocation] = useState(null);
  const [geocode, setGeocode] = useState(null);
  const [isButtonActive, setButtonActive] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    if (!location) {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
          return;
        }
        const loc = await Location.getCurrentPositionAsync({});
        setGeocode(loc);
        const grantedLocation = await Location.reverseGeocodeAsync(loc.coords);
        const country = grantedLocation[0]["country"];
        const city = grantedLocation[0]["city"];
        setLocation(`${country}, ${city}`);
      })();
    }
  }, [location]);

  useEffect(() => {
    if (name && location) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  }, [name, location]);

  const resetState = () => {
    setPhotoUri(null);
    setName("");
    setLocation("");
  };

  const onSubmit = () => {
    const newPost = {
      id: Date.now(),
      name,
      location: {
        geo: geocode,
        name: location,
      },
      imageUrl: photoUri,
      likes: 0,
      comments: [],
    };
    dispatch(createPost({userId, newPost}))
    resetState();
  };

  if (hasPermission === false || hasPermission === null) {
    return <Text>No access to camera</Text>;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.cameraContainer}>
            {photoUri && (
              <ImageBackground
                source={{ uri: photoUri }}
                style={{
                  height: "100%",
                  width: "100%",
                }}
              >
                <TouchableOpacity
                  style={styles.photoButton}
                  onPress={() => {
                    setPhotoUri(null);
                  }}
                >
                  <Svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="#fff"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <G clipPath="url(#clip0_36_0)" fill="#fff">
                      <Path d="M12 15.2a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4z" />
                      <Path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
                    </G>
                    <Defs>
                      <ClipPath id="clip0_36_0">
                        <Path fill="#fff" d="M0 0H24V24H0z" />
                      </ClipPath>
                    </Defs>
                  </Svg>
                </TouchableOpacity>
              </ImageBackground>
            )}
            {!photoUri && (
              <Camera style={styles.camera} type={type} ref={setCameraRef}>
                <View style={styles.photoView}>
                  <TouchableOpacity
                    style={styles.flipContainer}
                    onPress={() => {
                      setType(
                        type === Camera.Constants.Type.back
                          ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back
                      );
                    }}
                  >
                    <Svg width={30} height={30} viewBox="0 0 56 56" fill="#BDBDBD">
                      <Path d="M7.809 50.348H48.19c4.875 0 7.36-2.438 7.36-7.266V18.543c0-4.828-2.485-7.242-7.36-7.242h-5.484c-1.828 0-2.39-.375-3.445-1.547l-1.899-2.11c-1.148-1.288-2.343-1.992-4.781-1.992h-9.328c-2.414 0-3.61.704-4.781 1.992l-1.899 2.11c-1.031 1.148-1.617 1.547-3.445 1.547h-5.32c-4.875 0-7.36 2.414-7.36 7.242v24.539c0 4.828 2.485 7.266 7.36 7.266zm.07-3.774c-2.32 0-3.656-1.242-3.656-3.68v-24.14c0-2.438 1.336-3.68 3.656-3.68h6.187c2.11 0 3.235-.398 4.407-1.71l1.851-2.063c1.336-1.5 2.016-1.875 4.102-1.875h6.984c2.086 0 2.766.375 4.102 1.875l1.851 2.062c1.172 1.313 2.297 1.711 4.407 1.711h6.351c2.32 0 3.657 1.242 3.657 3.68v24.14c0 2.438-1.336 3.68-3.657 3.68zm20.133-29.883c-2.813 0-5.696 1.008-7.64 2.649-1.079.844-1.36 2.015-.563 2.86.796.843 1.828.726 2.695.046 1.64-1.312 3.305-1.969 5.508-1.969 4.547 0 8.32 3.07 9.328 7.078h-2.555c-1.054 0-1.312 1.008-.703 1.805l3.68 5.133c.61.844 1.664.914 2.297 0l3.632-5.133c.587-.82.352-1.805-.703-1.805h-2.273c-1.102-6.304-6.211-10.664-12.703-10.664zm-15.07 14.79h2.413c1.125 6.304 6.235 10.663 12.704 10.663 2.835 0 5.671-.984 7.664-2.624 1.078-.844 1.359-2.04.562-2.883-.797-.844-1.828-.703-2.742-.047-1.64 1.289-3.281 1.992-5.484 1.992-4.524 0-8.32-3.07-9.305-7.102h2.414c1.031 0 1.313-.984.703-1.804l-3.68-5.11c-.609-.843-1.664-.914-2.296 0l-3.633 5.11c-.586.82-.352 1.805.68 1.805z" />
                    </Svg>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.photoButton}
                    onPress={async () => {
                      if (cameraRef) {
                        const { uri } = await cameraRef.takePictureAsync();
                        await MediaLibrary.createAssetAsync(uri);
                        setPhotoUri(uri);
                      }
                    }}
                  >
                    <Svg
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="#fff"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <G clipPath="url(#clip0_36_0)" fill="#fff">
                        <Path d="M12 15.2a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4z" />
                        <Path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
                      </G>
                      <Defs>
                        <ClipPath id="clip0_36_0">
                          <Path fill="#fff" d="M0 0H24V24H0z" />
                        </ClipPath>
                      </Defs>
                    </Svg>
                  </TouchableOpacity>
                </View>
              </Camera>
            )}
          </View>
          {photoUri ? (
            <Text style={styles.text}>Редагувати фото</Text>
          ) : (
            <Text style={styles.text}>Завантажте фото</Text>
          )}
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Назва..."
          ></TextInput>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              paddingLeft={28}
              value={location}
              onChangeText={setLocation}
              placeholder="Місцевість..."
            ></TextInput>
            <Feather style={styles.inputIcon} name="map-pin" size={24} />
          </View>
          <Pressable
            style={isButtonActive ? styles.activeButton : styles.disabledButton}
            disabled={isButtonActive ? false : true}
          >
            <Text
              style={isButtonActive ? styles.buttonTextActive : styles.buttonTextDisabled}
              onPress={() => {
                onSubmit();
                navigation.navigate("Posts");
              }}
            >
              Опублікувати
            </Text>
          </Pressable>
          <Pressable
            style={styles.deleteWrapper}
            onPress={() => {
              resetState();
              navigation.navigate("Posts");
            }}
          >
            <Feather style={styles.deleteIcon} name="trash-2" size={24} />
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
    paddingBottom: 22,
    paddingLeft: 16,
    paddingRight: 16,
  },
  cameraContainer: {
    position: "relative",
    width: "100%",
    height: 240,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
  camera: { flex: 1, overflow: "hidden" },
  photoView: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
  },
  flipContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    alignSelf: "flex-end",
  },
  photoButton: {
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -30 }],
    alignSelf: "center",
    width: 60,
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    alignSelf: "flex-start",
    marginBottom: 48,
    color: "#BDBDBD",
    // font-family: Roboto;
    fontSize: 16,
  },
  buttonTextActive: {
    // font-family: Roboto;
    fontSize: 16,
    color: "#ffffff",
  },
  buttonTextDisabled: {
    // font-family: Roboto;
    fontSize: 16,
    color: "#BDBDBD",
  },
  inputWrapper: {
    position: "relative",
    width: "100%",
    height: 50,
    marginBottom: 16,
  },
  input: {
    width: "100%",
    height: 50,
    marginBottom: 16,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
    color: "#212121",
    fontSize: 16,
    // font-family: Roboto;
  },
  inputIcon: {
    color: "#BDBDBD",
    position: "absolute",
    left: 0,
    bottom: 13,
  },
  activeButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 343,
    height: 51,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 16,
    marginTop: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  disabledButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 343,
    height: 51,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 16,
    marginTop: 16,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
  },
  deleteWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F6F6F6",
    marginTop: "auto",
  },
  deleteIcon: {
    color: "#BDBDBD",
  },
});

export default CreatePostsScreen;
