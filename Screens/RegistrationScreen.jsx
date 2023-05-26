import React from "react";
import BackgroundImage from "../images/background-image.jpeg";

import { ImageBackground, StyleSheet, View, Animated, Text } from "react-native";

const RegistrationScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={BackgroundImage}
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <View style={styles.box}>
          <Animated.View style={styles.imageWrapper}></Animated.View>
          <Text>Реєстрація</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    position: "relative",
    height: 549,
    width: "100%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "white",
    marginTop: "auto",
    paddingTop: 92,
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
});

export default RegistrationScreen;
