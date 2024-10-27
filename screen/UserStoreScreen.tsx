import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useAppSelector } from "../redux-toolkit/hook";
import { selectAuthState } from "../auth/auth-slice";
import axios from "axios";
import Axios from "axios";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";

const UserStoreScreen = ({ navigation }): React.JSX.Element => {
  const { currentUser, profile, IP } = useAppSelector(selectAuthState);

  const [image, setImage] = useState<string>(
    Image.resolveAssetSource(require("../assets/favicon.png")).uri
  );
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [fetchResult, setResult] = useState<boolean>(false);
  const [status, setStatus] = useState(profile.IsOpen);
  const [shopName, setShopName] = useState(
    profile.ShopName ? profile.ShopName : "ชื่อร้านค้า"
  );
  const [textInput, setTextInput] = useState<string>("");
  const [textInput2, setTextInput2] = useState<string>("");
  const [target, setTarget] = useState<string>("");
  const [items, setItems] = useState<any>({});
  const [modalImg, setModalImg] = useState<string>(
    Image.resolveAssetSource(require("../assets/favicon.png")).uri
  );
  const [loading, setLoading] = useState<boolean>(false);

  const fetchImg = async () => {
    try {
      const url = `http://${IP}:3000/api/selectImg?target=${
        currentUser + "Shop"
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchItem = async () => {
    try {
      setLoading(true);
      const url = `http://${IP}:3000/api/getItem?ID=${currentUser}`;

      const res = await axios.get(url);

      if (res.data != "") {
        setItems(res.data);
        //console.log("get ITEM");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const UpdateShop = async () => {
    try {
      Axios.put(`http://${IP}:3000/api/setStatus`, {
        ID: currentUser,
      });
      setStatus(!status);
      console.log("shop Toggle");
    } catch (error) {
      console.log(error);
    }
  };

  const RenameShop = async () => {
    try {
      Axios.put(`http://${IP}:3000/api/updateShop`, {
        ID: currentUser,
        shopName: textInput,
      });
      setShopName(textInput);
      setModalVisible(!modalVisible);
      console.log("Rename");
      setTextInput("");
    } catch (error) {
      console.log(error);
    }
  };

  const addItem = async () => {
    try {
      let tempID = Date.now().toString();

      if (
        modalImg !==
        Image.resolveAssetSource(require("../assets/favicon.png")).uri
      ) {
        Axios.post(`http://${IP}:3000/api/uploadItem`, {
          ItemID: tempID,
          ItemName: textInput,
          Price: textInput2,
          ID: currentUser,
          ImageData: modalImg,
        });

        console.log("Item Added");
        fetchItem();
        console.log("Refresh List");
        setModalVisible(!modalVisible);
      } else if (
        modalImg ===
        Image.resolveAssetSource(require("../assets/favicon.png")).uri
      ) {
        Alert.alert("ไม่มีรูปสินค้า", "กรุณาอัปโหลดรูปสินค้า");
      } else {
        console.log("condition failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = async (target: string) => {
    try {
      Axios.put(`http://${IP}:3000/api/deleteItem`, {
        ItemID: target,
      });

      console.log("deleted");
      fetchItem();
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = (target: string) => {
    setTarget(target);
    //console.log(items.length);
    setModalVisible(true);
  };

  const nameModal = () => (
    <View style={{ backgroundColor: "#00000046", flex: 1 }}>
      <View style={styles.modalView}>
        <View>
          <TextInput
            style={styles.input}
            value={textInput}
            onChangeText={setTextInput}
            placeholder="โปรดกรอกชื่อร้านค้า"
            maxLength={20}
          />

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <Text style={{ top: "25%", color: "#4F6C8B" }}>
                <MaterialIcon name="keyboard-backspace" size={12} />
                ย้อนกลับ
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => RenameShop()}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>ตกลง</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  const itemModal = () => (
    <View style={{ backgroundColor: "#00000046", flex: 1 }}>
      <View style={styles.modalView}>
        <View>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => pickImage("item")}
              style={{ marginBottom: 10 }}
            >
              <Image source={{ uri: modalImg }} style={styles.image} />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              value={textInput}
              onChangeText={setTextInput}
              placeholder="โปรดกรอกชื่อสินค้า"
              maxLength={20}
              keyboardType="default"
            />
            <TextInput
              style={styles.input}
              value={textInput2}
              onChangeText={setTextInput2}
              placeholder="โปรดกรอกราคา"
              maxLength={20}
              keyboardType="numeric"
            />
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <Text style={{ top: "25%", color: "#4F6C8B" }}>
                <MaterialIcon name="keyboard-backspace" size={12} />
                ย้อนกลับ
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => addItem()}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>ตกลง</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  const pickImage = async (from: string) => {
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

        if (from === "shop") {
          if (fetchResult) {
            Axios.put(`http://${IP}:3000/api/updateImg`, {
              ImageData: result.assets[0].uri,
              ImageID: currentUser + "Shop",
            });
            console.log("update");
          } else if (!fetchResult) {
            Axios.post(`http://${IP}:3000/api/uploadImg`, {
              ImageID: currentUser + "Shop",
              ImageData: result.assets[0].uri,
              ID: currentUser,
            });
            setResult(true);
            console.log("upload");
          }

          setImage(result.assets[0].uri);
        } else if (from === "item") {
          setModalImg(result.assets[0].uri);
          console.log(modalImg);
        } else {
          console.log("failed condition");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const _renderItem = ({ item, index }) => (
    <>
      <View style={{ flexDirection: "row" }}>
        <View>
          <Image
            source={{ uri: item.ImageData }}
            style={styles.listImage}
            key={index}
          />
          <Text style={{ fontWeight: "bold", fontSize: 17 }}>
            {item.ItemName}
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{}}>ราคา {item.Price} บาท</Text>
            <TouchableOpacity onPress={() => deleteItem(item.ItemID)}>
              <MaterialIcon name="trash-can" size={25} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );

  useEffect(() => {
    fetchImg();
    fetchItem();
    //console.log(profile);
  }, []);

  useEffect(() => {
    setTextInput("");
    setTextInput2("");
    setModalImg(Image.resolveAssetSource(require("../assets/favicon.png")).uri);
    //console.log("reset modal");
  }, [modalVisible]);

  return (
    <>
      <View style={styles.container1}>
        <Image source={{ uri: image }} style={styles.background} />

        <View style={styles.container2}>
          <TouchableOpacity onPress={() => pickImage("shop")}>
            <Image source={{ uri: image }} style={styles.storeImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={UpdateShop}>
            <Text
              style={{ color: "#FFFFFFFF", fontWeight: "bold", fontSize: 22 }}
            >
              {status ? "ปิด" : "เปิด"}ร้าน
            </Text>
          </TouchableOpacity>

          <View style={styles.container3}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold", fontSize: 22 }}>
                {shopName}
              </Text>
              <TouchableOpacity
                style={{ marginLeft: 18 }}
                onPress={() => openModal("name")}
              >
                <MaterialIcon name="file-document-edit-outline" size={22} />
              </TouchableOpacity>
            </View>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontSize: 18 }}>ผู้ติดตาม: 500</Text>
              <Text style={{ fontSize: 18 }}>คะแนนร้าน: 9.8</Text>
            </View>

            <View style={[styles.container1, { marginTop: 25 }]}>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                  รายการสินค้า
                </Text>
                <TouchableOpacity
                  style={{
                    marginLeft: 25,
                    backgroundColor: "#4177BEFF",
                    borderRadius: 150 / 2,
                  }}
                  onPress={() => openModal("item")}
                >
                  <MaterialIcon name="hospital" size={30} color={"white"} />
                </TouchableOpacity>
              </View>
              <View style={{ paddingVertical: 15, flex: 1 }}>
                <FlatList
                  data={items}
                  renderItem={_renderItem}
                  keyExtractor={(Item, index) => JSON.stringify(Item)}
                  numColumns={2}
                  columnWrapperStyle={{ justifyContent: "space-between" }}
                  extraData={loading}
                  contentContainerStyle={{
                    paddingHorizontal: 20,
                    paddingBottom: 20,
                    rowGap: 10,
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        {target == "name" ? nameModal() : itemModal()}
      </Modal>
    </>
  );
};

export default UserStoreScreen;

const styles = StyleSheet.create({
  container1: {
    flex: 1,
  },

  container2: {
    flex: 4,
    backgroundColor: "white",
  },

  background: {
    flex: 1,
    resizeMode: "stretch",
  },

  storeImage: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    position: "absolute",
    top: -30,
    start: 20,
  },

  button: {
    position: "absolute",
    right: 50,
    top: 50,
    borderRadius: 15,
    padding: 10,
    backgroundColor: "#4177BEFF",
  },

  container3: {
    flex: 1,
    marginTop: 120,
    padding: 15,
    rowGap: 10,
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

  input: {
    borderColor: "#333",
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    width: 250,
  },

  confirmButton: {
    padding: 10,
    backgroundColor: "#4177BEFF",
    borderRadius: 15,
  },

  image: {
    height: 100,
    width: 100,
    borderRadius: 150 / 2,
    overflow: "hidden",
    backgroundColor: "gray",
  },

  listImage: {
    height: 100,
    width: 150,
    overflow: "hidden",
    backgroundColor: "gray",
  },
});
