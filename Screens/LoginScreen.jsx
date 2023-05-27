import React from "react";
import BackgroundImage from "../assets/background-image.jpeg";

import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";

const onFocusStyle = { borderColor: "#FF6C00", color: "#212121", backgroundColor: "#FFFFFF" };
const onBlurStyle = { borderColor: "#E8E8E8", color: "#BDBDBD", backgroundColor: "#F6F6F6" };

const LoginScreen = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailInputStyles, setEmailInputStyles] = React.useState({ ...onBlurStyle });
  const [passwordInputStyles, setPasswordInputStyles] = React.useState({ ...onBlurStyle });

  const onLogin = () => {
    console.log('email: ' + email);
    console.log('password: ' + password);
  }

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
              <Text style={styles.title}>Увійти</Text>
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
              <Pressable style={styles.button} onPress={onLogin}>
                <Text style={styles.buttonText}>Увійти</Text>
              </Pressable>
              <Pressable>
                <Text style={styles.loginText}>Немає акаунту? Зареєструватися</Text>
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
    height: 489,
    width: "100%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "white",
    marginTop: "auto",
    paddingTop: 32,
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

export default LoginScreen;
