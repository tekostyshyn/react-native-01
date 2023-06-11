import React from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { register } from "../redux/auth/operations";
import Svg, { Path } from "react-native-svg";
import BackgroundImage from "../assets/background-image.jpeg";

import {
  ImageBackground,
  StyleSheet,
  View,
  Animated,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";

const onFocusStyle = {
  borderColor: "#FF6C00",
  color: "#212121",
  backgroundColor: "#FFFFFF",
};
const onBlurStyle = {
  borderColor: "#E8E8E8",
  color: "#BDBDBD",
  backgroundColor: "#F6F6F6",
};

const RegistrationScreen = () => {
  const [login, setLogin] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loginInputStyles, setLoginInputStyles] = React.useState({ ...onBlurStyle });
  const [emailInputStyles, setEmailInputStyles] = React.useState({ ...onBlurStyle });
  const [passwordInputStyles, setPasswordInputStyles] = React.useState({ ...onBlurStyle });
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onRegister = () => {
    dispatch(
      register({
        email,
        password,
        login,
      })
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <ImageBackground
            source={BackgroundImage}
            style={{
              height: "100%",
              width: "100%",
            }}
          >
            <View style={styles.box}>
              <Animated.View style={styles.imageWrapper}>
                <Pressable style={styles.addButton}>
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
                      fill="#FF6C00"
                    />
                  </Svg>
                </Pressable>
              </Animated.View>
              <Text style={styles.title}>Реєстрація</Text>
              <TextInput
                style={[styles.input, loginInputStyles]}
                onChangeText={setLogin}
                value={login}
                placeholder="Логін"
                onFocus={() => {
                  setLoginInputStyles({ ...onFocusStyle });
                }}
                onBlur={() => {
                  setLoginInputStyles({ ...onBlurStyle });
                }}
              />
              <TextInput
                style={[styles.input, emailInputStyles]}
                onChangeText={setEmail}
                value={email}
                placeholder="Адреса електронної пошти"
                keyboardType="email-address"
                onFocus={() => {
                  setEmailInputStyles({ ...onFocusStyle });
                }}
                onBlur={() => {
                  setEmailInputStyles({ ...onBlurStyle });
                }}
              />
              <View style={styles.inputWrapper}>
                <TextInput
                  style={[styles.input, passwordInputStyles]}
                  onChangeText={setPassword}
                  value={password}
                  placeholder="Пароль"
                  onFocus={() => {
                    setPasswordInputStyles({ ...onFocusStyle });
                  }}
                  onBlur={() => {
                    setPasswordInputStyles({ ...onBlurStyle });
                  }}
                />
                <Pressable style={styles.showTextButton}>
                  <Text style={styles.showText}>Показати</Text>
                </Pressable>
              </View>
              <Pressable style={styles.button}>
                <Text
                  style={styles.buttonText}
                  onPress={() => {
                    onRegister();
                    navigation.navigate("Home");
                  }}
                >
                  Зареєструватися
                </Text>
              </Pressable>
              <Pressable onPress={() => navigation.navigate("Login")}>
                <Text style={styles.loginText}>Вже є акаунт? Увійти</Text>
              </Pressable>
            </View>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
  addButton: {
    position: "absolute",
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "#FF6C00",
    backgroundColor: "#FFFFFF",
    width: 25,
    height: 25,
    right: -12,
    top: 80,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    // font-family: Roboto;
    textAlign: "center",
    fontSize: 30,
    fontWeight: 500,
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
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 343,
    height: 51,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  buttonText: {
    // font-family: Roboto;
    fontSize: 16,
    color: "#FFFFFF",
  },
  loginText: {
    // font-family: Roboto;
    fontSize: 16,
    color: "#1B4371",
    textAlign: "center",
  },
  inputWrapper: {
    position: "relative",
    width: 343,
    height: 50,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 43,
  },
  showText: {
    // font-family: Roboto;
    fontSize: 16,
    color: "#1B4371",
  },
  showTextButton: {
    position: "absolute",
    right: 16,
    top: 14,
  },
});

export default RegistrationScreen;
