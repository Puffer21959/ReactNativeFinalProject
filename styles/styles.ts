import { StyleSheet } from "react-native";

//หน้า Login.tsx
const styleLogin = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 20,
    marginTop: "75%",
    backgroundColor: "#ffffff", // ต้งัค่าสีพ้ืนหลงัเป็นสีขาว
    borderRadius: 10, // เพิ่มความมนให้กบัขอบคอนเทนเนอร์
    //elevation: 3, // เพิ่มเงาให้กบัคอนเทนเนอร์(เฉพาะ Android)
    width: "75%", // ต้งัความกวา้งของ container ให้เต็มหน้าจอ
    alignSelf: "center",
  },
  regisButton: {
    backgroundColor: "#4F6C8B",
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 7.5,
    paddingVertical: 5,
  },
  loginButton: {
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 7.5,
    paddingVertical: 5,
    borderColor: "#4F6C8B",
    borderStyle: "solid",
    borderWidth: 1.5,
  },
  input: {
    borderRadius: 10,
    marginVertical: 5,
    padding: 2.5,
    borderStyle: "solid",
    borderColor: "#4F6C8B",
    borderWidth: 0.5,
    paddingLeft: 15,
  },
});

//หน้า Register.tsx
const styleRegister = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 20,
    marginTop: "30%",
    backgroundColor: "#ffffff", // ต้งัค่าสีพ้ืนหลงัเป็นสีขาว
    borderRadius: 10, // เพิ่มความมนให้กบัขอบคอนเทนเนอร์
    //elevation: 3, // เพิ่มเงาให้กบัคอนเทนเนอร์(เฉพาะ Android)
    width: "75%", // ต้งัความกวา้งของ container ให้เต็มหน้าจอ
    alignSelf: "center",
  },
  filledButton: {
    backgroundColor: "#4F6C8B",
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 7.5,
    paddingVertical: 5,
  },
  input: {
    borderRadius: 10,
    marginVertical: 5,
    padding: 2.5,
    borderStyle: "solid",
    borderColor: "#4F6C8B",
    borderWidth: 0.5,
    paddingLeft: 15,
  },
});

export { styleLogin, styleRegister };
