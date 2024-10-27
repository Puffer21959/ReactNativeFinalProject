import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useAppDispatch, useAppSelector } from "../redux-toolkit/hook";
import { selectAuthState, setCart } from "../auth/auth-slice";

const StoreScreen = ({ navigation, route }): React.JSX.Element => {
  //let tempID = "1729602335364";
  let tempID = route.params;

  const { IP } = useAppSelector(selectAuthState);
  const dispatch = useAppDispatch();

  const [image, setImage] = useState<string>(
    Image.resolveAssetSource(require("../assets/favicon.png")).uri
  );
  const [storeData, setStoreData] = useState<any>({});
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [target, setTarget] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [items, setItems] = useState<any>({});

  let [amount, setAmount] = useState<number>(0);

  const fetchImg = async () => {
    try {
      const url = `http://${IP}:3000/api/selectImg?target=${tempID + "Shop"}`;

      const res = await axios.get(url);
      //console.log(res);

      if (res.data != "") {
        //console.log("attemp");
        setImage(res.data[0].ImageData);

        //setResult(true);
        //console.log(image);
      } else {
        console.log("no Image result");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    const url = `http://${IP}:3000/api/getProfile?currentUser=${tempID}`;

    const response = await axios.get(url);

    setStoreData(response.data[0]);

    //console.log(response.data[0] + "TEST");
  };

  const fetchItem = async () => {
    try {
      setLoading(true);
      const url = `http://${IP}:3000/api/getItem?ID=${tempID}`;

      const res = await axios.get(url);

      if (res.data != "") {
        setItems(res.data);
        //console.log(res.data);
        //console.log("get ITEM");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (target: any) => {
    setTarget(target);
    //console.log(items.length);
    setModalVisible(true);
  };

  const addToCart = (data: object) => {
    if (amount === 0) {
      setModalVisible(!modalVisible);
      return;
    }

    data["amount"] = amount;
    data["ID"] = tempID;

    console.log(data);

    dispatch(setCart(data));

    setAmount(0);
    setModalVisible(!modalVisible);
  };

  const _renderItem = ({ item, index }) => (
    <>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={() => openModal(item)}>
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
            <Text>ราคา {item.Price} บาท</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );

  useEffect(() => {
    fetchImg();
    fetchData();
    fetchItem();
    console.log("fetch");
    console.log(route.params)
  }, []);

  return (
    <>
      <View style={styles.container1}>
        <Image source={{ uri: image }} style={styles.background} />
        <View style={styles.container2}>
          <Image source={{ uri: image }} style={styles.storeImage} />

          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log("ติดตาม")}
          >
            <Text
              style={{ color: "#FFFFFFFF", fontWeight: "bold", fontSize: 22 }}
            >
              ติดตาม
            </Text>
          </TouchableOpacity>

          <View style={styles.container3}>
            <Text style={{ fontWeight: "bold", fontSize: 22 }}>
              {storeData.ShopName}
            </Text>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontSize: 18 }}>ผู้ติดตาม: 500</Text>
              <Text style={{ fontSize: 18 }}>คะแนนร้าน: 9.8</Text>
            </View>

            <View style={[styles.container1, { marginTop: 25 }]}>
              <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                รายการสินค้า
              </Text>
              <View style={{ paddingVertical: 15, flex: 1 }}>
                <FlatList
                  data={items}
                  renderItem={_renderItem}
                  keyExtractor={(Item, index) => JSON.stringify(Item)}
                  numColumns={2}
                  columnWrapperStyle={{ justifyContent: "space-between" }}
                  extraData={loading}
                  persistentScrollbar={true}
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
        <View style={{ backgroundColor: "#00000046", flex: 1 }}>
          <View style={styles.modalView}>
            <View style={{ width: 250 }}>
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 22 }}>
                  จำนวนที่ใส่ตะกร้า
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginVertical: 10,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => (amount === 0 ? {} : setAmount(amount - 1))}
                  >
                    <MaterialIcon name="minus-circle" size={22} />
                  </TouchableOpacity>
                  <Text style={{ marginHorizontal: 10 }}>{amount}</Text>
                  <TouchableOpacity onPress={() => setAmount(amount + 1)}>
                    <MaterialIcon name="plus-circle" size={22} />
                  </TouchableOpacity>
                </View>
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
                    setAmount(0);
                  }}
                >
                  <Text style={{ top: "25%", color: "#4F6C8B" }}>
                    <MaterialIcon name="keyboard-backspace" size={12} />
                    ย้อนกลับ
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={() => addToCart(target)}
                >
                  <Text style={{ fontWeight: "bold", color: "white" }}>
                    ตกลง
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default StoreScreen;

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

  listImage: {
    height: 100,
    width: 150,
    overflow: "hidden",
    backgroundColor: "gray",
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
});
