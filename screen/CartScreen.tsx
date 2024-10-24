import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useAppSelector } from "../redux-toolkit/hook";
import { selectAuthState } from "../auth/auth-slice";

//TODO: >List of item in cart
//      >Payment Process

const CartScreen = (): React.JSX.Element => {
  const { cart } = useAppSelector(selectAuthState);

  useEffect(() => {
    //console.log(cart);
  }, []);

  return (
    <>
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.scroll}>
          <View style={{ flexDirection: "column" }}>
            <Text>CartScreen</Text>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.footerBox}>
            <Text style={styles.footerText}>ยอดรวม: </Text>
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
    backgroundColor: "azure",
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
});
