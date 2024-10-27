import { Text, TouchableOpacity, View, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { styleRegister } from "../styles/styles";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";

const Register = (): React.JSX.Element => {
  const navigation = useNavigation<any>();

  const [page, setpage] = useState(1);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const fetchUser = async () => {
    const url = `http://192.168.1.100:3000/api/choose?email=${email}`;
    try {
      const response = await axios.get(url);
      console.log("Fetch User Response:", response.data);

      // Check for the existence of 'exists'
      console.log("Checking if user exists:", response.data.exists);

      if (response.data.exists) {
        alert("This user already exists");
      } else {
        alert("Register Complete");
        navigation.navigate("Login");
        await axios.post("http://192.168.1.100:3000/api/insert", {
          ID: Date.now().toString(),
          Email: email,
          Name: name,
          Password: password,
        });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      alert("Error connecting to the server.");
    }
  };
  //register
  function checkRegister() {
    if (email === "" || password === "" || name === "" || confirm === "") {
      Alert.alert("Register failed", "Please enter all information");
    } else if (!email.includes("@")) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
    } else if (password.length < 8) {
      Alert.alert("Invalid Password", "Password must at least have 8 letter");
    } else if (password !== confirm) {
      Alert.alert("Invalid Password", "Password do not match");
    } else {
      fetchUser();
    }
  }

  function renderElement() {
    if (page == 1) {
      return (
        <View style={styleRegister.container}>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 20,
              marginBottom: 5,
            }}
          >
            ลงทะเบียน
          </Text>

          <Text
            style={{ textAlign: "center", fontWeight: "bold", marginTop: 5 }}
          >
            สร้างบัญชีใหม่
          </Text>

          <Text style={{ marginVertical: 5 }}>
            กรุณาเข้าสู่ระบบของคุณเพื่อเข้าสู่ระบบแอปนี้
          </Text>

          <TouchableOpacity
            style={styleRegister.filledButton}
            onPress={() => setpage(2)}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              ลงทะเบียนด้วยอีเมล
            </Text>
          </TouchableOpacity>
        </View>
      ); // end of page 1
    } else if (page == 2) {
      return (
        <View style={styleRegister.container}>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 20,
              marginBottom: 5,
            }}
          >
            ลงทะเบียน
          </Text>

          <Text
            style={{ textAlign: "center", fontWeight: "bold", marginTop: 5 }}
          >
            สร้างบัญชีใหม่
          </Text>

          <Text style={{ textAlign: "center", marginTop: 5 }}>
            กรุณากรอกข้อมูลลงทะเบียน
          </Text>

          <View>
            <TextInput
              style={styleRegister.input}
              placeholder="กรอกอีเมล"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styleRegister.input}
              placeholder="กรอกชื่อผู้ใช้"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styleRegister.input}
              placeholder="กรอกรหัสผ่าน"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
            <TextInput
              style={styleRegister.input}
              placeholder="ยืนยันรหัสผ่านอีกครั้ง"
              secureTextEntry={true}
              value={confirm}
              onChangeText={setConfirm}
            />

            {/*TODO: ระบบลงทะเบียน*/}
            <TouchableOpacity
              style={styleRegister.filledButton}
              onPress={checkRegister}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                ลงทะเบียน
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
      ); // end of page 2
    }
  }

  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      {renderElement()}
    </View>
  );
};

export default Register;
