import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { styleLogin } from "../styles/styles";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useAppDispatch } from "../redux-toolkit/hook";
import { setCurrentUser, setIP } from "../auth/auth-slice";

const Login = (): React.JSX.Element => {
  let IP = "192.168.1.165";

  const navigation = useNavigation<any>();

  const [page, setpage] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();
  dispatch(setIP(IP));

  const fetchUser = async () => {
    const url = `http://${IP}:3000/api/select?email=${email}&password=${password}`;

    try {
      const response = await axios.get(url);
      //console.log(response.data);

      // Assuming response.data is true when credentials match
      if (response.data != "deny") {
        // Adjust based on your actual response

        dispatch(setCurrentUser(response.data[0].ID));

        navigation.navigate("Home");
      } else {
        Alert.alert("Login failed", "Incorrect email or password.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Connect fail", "Error connecting to the server.");
    }
  };

  function checkLogin() {
    if (email === "" && password === "") {
      Alert.alert("Login failed", "Please enter email and password");
    } else if (email === "") {
      Alert.alert("Login failed", "Please enter email");
    } else if (password === "") {
      Alert.alert("Login failed", "Please enter password");
    } else {
      fetchUser();
    }

    setEmail("");
    setPassword("");
  }

  function renderElement() {
    if (page == 1) {
      return (
        <View style={styleLogin.container}>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            เข้าสู่ระบบ
          </Text>

          <TouchableOpacity
            style={styleLogin.regisButton}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              ลงทะเบียน
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styleLogin.loginButton}
            onPress={() => {
              setpage(3);
            }}
          >
            <Text style={{ fontWeight: "bold" }}>เข้าสู่ระบบ</Text>
          </TouchableOpacity>
        </View>
      ); //end of page 1
    }
    //page 3 login page
    else if (page == 3) {
      return (
        <View style={styleLogin.container}>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            เข้าสู่ระบบ
          </Text>
          <Text style={{ marginVertical: 15 }}>
            กรุณากรอกอีเมลของคุณเพื่อเข้าสู่ระบบแอปนี้
          </Text>

          <View>
            <TextInput
              style={styleLogin.input}
              placeholder="กรอกอีเมล"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styleLogin.input}
              placeholder="กรอกรหัสผ่าน"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />

            {/*TODO: ระบบล็อคอิน */}
            <TouchableOpacity
              style={styleLogin.regisButton}
              onPress={checkLogin}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                เข้าสู่ระบบ
              </Text>
            </TouchableOpacity>
          </View>

          {/* ปุ่มย้อนกลับ */}
          <TouchableOpacity
            style={{ marginTop: 20, width: 85 }}
            onPress={() => setpage(1)}
          >
            <Text style={{ fontSize: 16, color: "#4F6C8B" }}>
              <MaterialIcon name="keyboard-backspace" size={16} />
              ย้อนกลับ
            </Text>
          </TouchableOpacity>
        </View>
      ); //end of page 3
    }
  }

  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      {renderElement()}
    </View>
  );
};

export default Login;
