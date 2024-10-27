import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";

import { selectAuthState } from "../auth/auth-slice";
import { useAppSelector } from "../redux-toolkit/hook";
import axios from "axios";
import Axios from "axios";

//TODO: >Make it look better

const ProfileScreen = ({ navigation }): React.JSX.Element => {
  const [image, setImage] = useState<string>(
    Image.resolveAssetSource(require("../assets/favicon.png")).uri
  );
  const [fetchResult, setResult] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [textInput, setTextInput] = useState<string>("");

  const { currentUser, profile, IP } = useAppSelector(selectAuthState);
  const [currentPass, setCurrentPass] = useState<string>(profile.Password);

  const fetchImg = async () => {
    try {
      const url = `http://${IP}:3000/api/selectImg?target=${
        currentUser + "Profile"
      }`;

      const res = await axios.get(url);
      //console.log(res);

      if (res.data != "") {
        //console.log("attemp");
        setImage(res.data[0].ImageData);

        setResult(true);
        //console.log(image);
      } else {
        console.log("no Image result");
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changePass = () => {
    try {
      Axios.put(`http://${IP}:3000/api/updatePass`, {
        oldPass: currentPass,
        newPass: textInput,
        ID: currentUser,
      });

      setCurrentPass(textInput);
      setTextInput("");
      setModalVisible(!modalVisible);
      Alert.alert("เปลี่ยนรหัสผ่านเรียบร้อยแล้ว");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAcc = () => {
    try {
      Axios.put(`http://${IP}:3000/api/deleteAccount`, {
        ID: currentUser,
      });

      navigation.navigate("Login");
      Alert.alert("บัญชีถูกลบแล้ว");
    } catch (error) {
      console.log(error);
    }
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      //see what's the ImagePick
      //console.log(result);

      if (!result.canceled) {
        //console.log(image);

        if (fetchResult) {
          Axios.put(`http://${IP}:3000/api/updateImg`, {
            ImageData: result.assets[0].uri,
            ImageID: currentUser + "Profile",
          });
          console.log("update");
        } else if (!fetchResult) {
          Axios.post(`http://${IP}:3000/api/uploadImg`, {
            ImageID: currentUser + "Profile",
            ImageData: result.assets[0].uri,
            ID: currentUser,
          });
          setResult(true);
          console.log("upload");
        }

        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchImg();
    console.log(currentUser);

    //console.log(image);
  }, []);

  return (
    <>
      <View style={styles.container1}>
        <View style={styles.container2}>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity onPress={pickImage}>
              <Image source={{ uri: image }} style={styles.image} />
            </TouchableOpacity>
          </View>

          {/*profile.name */}
          <Text style={styles.text}>{profile.Name}</Text>

          {/*profile.email */}
          <Text style={styles.text}>{profile.Email}</Text>

          <TouchableOpacity
            style={styles.passButton}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={[styles.text, { color: "#3F62D6FF" }]}>
              แก้ไข Password
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.passButton,
              {
                backgroundColor: "white",
                borderWidth: 2,
                borderColor: "#D12121FF",
              },
            ]}
            onPress={() => deleteAcc()}
          >
            <Text style={[styles.text, { color: "#D12121FF" }]}>ลบบัญชี</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Store")}>
            <Text>test</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <>
          <View style={{ backgroundColor: "#00000046", flex: 1 }}>
            <View style={styles.modalView}>
              <View style={{ width: 250 }}>
                <View style={{ rowGap: 5, paddingVertical: 10 }}>
                  <Text>กรอกรหัสผ่านใหม่</Text>
                  <TextInput
                    style={styles.input}
                    value={textInput}
                    onChangeText={setTextInput}
                    placeholder="รหัสผ่านใหม่"
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <Text style={{ top: "25%", color: "#4F6C8B" }}>
                      <MaterialIcon name="keyboard-backspace" size={12} />
                      ย้อนกลับ
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={() => changePass()}
                  >
                    <Text style={{ fontWeight: "bold", color: "white" }}>
                      ตกลง
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </>
      </Modal>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: "#4F6C8B",
    //backgroundColor: "#3F62D6FF",
    padding: 35,
  },

  container2: {
    backgroundColor: "white",
    borderRadius: 30,
    padding: 20,
    flex: 1,
    rowGap: 25,
  },

  image: {
    height: 100,
    width: 100,
    borderRadius: 150 / 2,
    overflow: "hidden",
    backgroundColor: "gray",
  },

  text: {
    fontWeight: "bold",
    fontSize: 20,
    //marginTop: 15,
  },

  passButton: {
    backgroundColor: "white",
    borderRadius: 15,
    alignSelf: "center",
    padding: 5,
    borderWidth: 2,
    borderColor: "#3F62D6FF",
  },

  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    top: "15%",
  },

  confirmButton: {
    padding: 10,
    backgroundColor: "#4177BEFF",
    borderRadius: 15,
  },

  input: {
    borderColor: "#333",
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    width: 250,
  },
});
