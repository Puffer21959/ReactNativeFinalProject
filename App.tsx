import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Login from "./screen/Login";
import Register from "./screen/Register";
import HomeScreen from "./screen/HomeScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MenuScreen from "./screen/MenuScreen";
import React from "react";
import ProfileScreen from "./screen/ProfileScreen";
import UserStoreScreen from "./screen/UserStoreScreen";
import CartScreen from "./screen/CartScreen";

const HomeStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function HomeStackScreen() {
  return (
    <Drawer.Navigator
      initialRouteName="Feed"
      screenOptions={{
        drawerPosition: "right",
        headerLeft: (props) => <></>,
      }}
      drawerContent={(props) => <MenuScreen {...props} />}
    >
      <Drawer.Screen name="Feed" component={HomeScreen} />
    </Drawer.Navigator>
  );
}

export default function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <HomeStack.Navigator initialRouteName="Login">
          <HomeStack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <HomeStack.Screen
            name="Register"
            component={Register}
            options={{ headerTitle: "" }}
          />
          <HomeStack.Screen
            name="Home"
            component={HomeStackScreen}
            options={{ headerBackVisible: false, headerShown: false }}
          />
          <HomeStack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ title: "" }}
          />
          <HomeStack.Screen
            name="UserStore"
            component={UserStoreScreen}
            options={{ title: "" }}
          />
          <HomeStack.Screen
            name="Cart"
            component={CartScreen}
            options={{ title: "รถเข็น" }}
          />
        </HomeStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}