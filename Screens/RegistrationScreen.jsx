import React from "react";
import BackgroundImage from "../images/background-image.jpeg";

import { ImageBackground, StyleSheet, View, Animated, Text, TextInput } from "react-native";

const onFocusStyle = {borderColor: "#FF6C00", color: "#212121", backgroundColor: "#FFFFFF"};
const onBlurStyle = {borderColor: "#E8E8E8", color: '#BDBDBD', backgroundColor: "#F6F6F6"};

const RegistrationScreen = () => {
  const [name, onChangeName] = React.useState("");
  const [number, onChangeNumber] = React.useState("");
  const [nameInputStyles, setNameInputStyles] = React.useState({...onBlurStyle});
  const [numberInputStyles, setNumberInputStyles] = React.useState({...onBlurStyle});
  const [passwordInputStyles, setPasswordInputStyles] = React.useState({...onBlurStyle});


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
          <Text style={styles.title}>Реєстрація</Text>
          <TextInput
            style={[styles.input, nameInputStyles]}
            onChangeText={onChangeName}
            value={name}
            placeholder="Логін"
            onFocus={() => {setNameInputStyles({...onFocusStyle})}}
            onBlur={() => {setNameInputStyles({...onBlurStyle})}}
          />
          <TextInput
            style={[styles.input, numberInputStyles]}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="Адреса електронної пошти"
            keyboardType="numeric"
            onFocus={() => {setNumberInputStyles({...onFocusStyle})}}
            onBlur={() => {setNumberInputStyles({...onBlurStyle})}}
          />
             <TextInput
            style={[styles.input, passwordInputStyles]}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="Пароль"
            keyboardType="numeric"
            onFocus={() => {setPasswordInputStyles({...onFocusStyle})}}
            onBlur={() => {setPasswordInputStyles({...onBlurStyle})}}
          />
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
  title: {
    // font-family: Roboto;
    textAlign: "center",
    fontSize: 30,
    fontWeight: 500,
    lineHeight: 1.17,
    marginBottom: 33,
  },
  input: {
    // font-family: Roboto;
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 8,
    width: 343,
    height: 50,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 16,
    padding: 16,
    fontSize: 16,
    lineHeight: 1.17,
  },
});

export default RegistrationScreen;
