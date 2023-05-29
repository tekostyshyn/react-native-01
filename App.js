import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Registration, Login, Home } from "./Screens";

const MainStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Registration">
        <MainStack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <MainStack.Screen name="Registration" component={Registration} options={{ headerShown: false }}/>
        <MainStack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
