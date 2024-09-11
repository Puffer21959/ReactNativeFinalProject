import { Text, TouchableOpacity, View, TextInput } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { styleRegister } from "../styles/styles";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";

const Register = (): React.JSX.Element => {
  const navigation = useNavigation<any>();

  const [page, setpage] = useState(1);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

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
              value={password}
              onChangeText={setPassword}
            />
            <TextInput
              style={styleRegister.input}
              placeholder="ยืนยันรหัสผ่านอีกครั้ง"
              value={confirm}
              onChangeText={setConfirm}
            />

            {/*TODO: ระบบลงทะเบียน*/}
            <TouchableOpacity
              style={styleRegister.filledButton}
              onPress={() => navigation.navigate("Home")}
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
