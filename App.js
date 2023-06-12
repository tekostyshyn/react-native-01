import "react-native-gesture-handler";
import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Registration, Login, Home, Posts, Comments, Map } from "./Screens";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { selectLoginState } from "./redux/auth/selectors";

const MainStack = createStackNavigator();

const AppNavigation = () => {
  const isLoggedIn = useSelector(selectLoginState);

  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName={isLoggedIn ? "Home" : "Login"}>
        <MainStack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <MainStack.Screen
          name="Registration"
          component={Registration}
          options={{ headerShown: false }}
        />
        <MainStack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <MainStack.Screen name="Posts" component={Posts} />
        <MainStack.Screen name="Comments" component={Comments} />
        <MainStack.Screen name="Map" component={Map} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigation/>
      </PersistGate>
    </Provider>
  );
}
