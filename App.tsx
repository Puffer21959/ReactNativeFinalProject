import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Login from "./screen/Login";
import Register from "./screen/Register";
import HomeScreen from "./screen/HomeScreen";

const HomeStack = createNativeStackNavigator();

export default function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <HomeStack.Navigator
          initialRouteName="Login"
        >
          <HomeStack.Screen name="Login" component={Login} options={{headerShown: false}} />
          <HomeStack.Screen name="Register" component={Register} options={{headerTitle: ""}} />
          <HomeStack.Screen name="Home" component={HomeScreen} />
        </HomeStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
