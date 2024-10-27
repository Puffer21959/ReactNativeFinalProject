import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux-toolkit/hook";
import { resetCart, selectAuthState } from "../auth/auth-slice";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import DropDownPicker from "react-native-dropdown-picker";

//TODO: >List of item in cart
//      >Payment Process

const CartScreen = (): React.JSX.Element => {
  const { cart } = useAppSelector(selectAuthState);
  const [list, setList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [dropItem, setDropItem] = useState([
    { label: "Visa", value: "visa" },
    { label: "MasterCard", value: "mastercard" },
  ]);
  const [dropOpen, setDropOpen] = useState(false);
  const [value, setValue] = useState(null);

  const dispatch = useAppDispatch();

  const calcTotal = () => {
    let temp = 0;
    cart.map((item: any) => {
      temp += item.Price * item.amount;
    });

    return temp;
  };

  const deleteItem = (id: any) => {
    let filtered = list.filter((item: any) => item.ItemID !== id);
    console.log(filtered);
    setList(filtered);

    dispatch(resetCart(filtered));
    //dispatch(setCart(filtered));
    //console.log(cart);
  };

  useEffect(() => {
    console.log(cart);
    setList(cart);
  }, []);

  const _renderItem = ({ item, index }) => (
    <>
      <View style={{ marginVertical: 10 }} key={item.ID}>
        <View style={{ flexDirection: "row" }}>
          <Image
            style={styles.listImage}
            source={{ uri: item.ImageData }}
            key={index}
          />
          <View style={{ padding: 10, rowGap: 10 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                {item.ItemName}
              </Text>
              <TouchableOpacity onPress={() => deleteItem(item.ItemID)}>
                <MaterialIcon name="trash-can" size={22} />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row", columnGap: 130 }}>
              <Text>จำนวน: </Text>
              <Text style={{ fontSize: 16 }}>{item.amount}</Text>
            </View>
            <View style={{ flexDirection: "row", columnGap: 130 }}>
              <Text>ราคา: </Text>
              <Text style={{ fontSize: 16 }}>{item.Price} บาท</Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );

  return (
    <>
      <View style={{ flex: 1 }}>
        <View style={{ padding: 10, flex: 1 }}>
          <FlatList
            style={styles.scroll}
            data={list}
            renderItem={_renderItem}
            keyExtractor={(item, index) => JSON.stringify(item)}
          />
        </View>

        <View style={styles.footer}>
          <View style={styles.footerBox}>
            <Text style={styles.footerText}>ยอดรวม: {calcTotal()} บาท</Text>
          </View>

          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <View style={[styles.footerBox, { backgroundColor: "#4177BEFF" }]}>
              <Text style={[styles.footerText, { color: "white" }]}>
                สั่งสินค้า
              </Text>
            </View>
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
                  <Text>เลือกวิธีชำระเงิน</Text>

                  <DropDownPicker
                    open={dropOpen}
                    items={dropItem}
                    value={value}
                    setOpen={setDropOpen}
                    setValue={setValue}
                    setItems={setDropItem}
                    placeholder="เลือกวิธีชำระเงิน"
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
                    onPress={() => setModalVisible(!modalVisible)}
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

export default CartScreen;

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: "",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 75,
    backgroundColor: "#C1BFBFFF",
  },

  footerBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  footerText: {
    fontWeight: "bold",
    fontSize: 22,
  },

  listImage: {
    height: "auto",
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
