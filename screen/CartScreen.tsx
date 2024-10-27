import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux-toolkit/hook";
import { resetCart, selectAuthState, setCart } from "../auth/auth-slice";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";

//TODO: >List of item in cart
//      >Payment Process

const CartScreen = (): React.JSX.Element => {
  const { cart } = useAppSelector(selectAuthState);
  const [list, setList] = useState([]);

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
      <View
        style={{ marginVertical: 10 }}
        key={item.ID}
      >
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
            onPress={() => console.log("Go to Payment")}
          >
            <View style={[styles.footerBox, { backgroundColor: "#4177BEFF" }]}>
              <Text style={[styles.footerText, { color: "white" }]}>
                สั่งสินค้า
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
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
});
