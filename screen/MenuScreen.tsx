import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const MenuScreen = ({ navigation }: any): React.JSX.Element => {
  function Line() {
    return (
      <View
        style={{
          height: 2,
          backgroundColor: "black",
          alignSelf: "stretch",
          marginVertical: 10,
        }}
      />
    );
  }

  return (
    <>
      <View style={styles.container1}>
        <View style={{ flexDirection: "row" }}>
          <Image
            source={require("../assets/favicon.png")}
            style={styles.image}
          />
          <Text style={styles.profileName}>ชื่อ นามสกุล</Text>
        </View>

        <Line />

        <View style={styles.container2}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("Profile");
              navigation.closeDrawer();
            }}
          >
            <Text style={styles.text}>บัญชี</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("UserStore");
              navigation.closeDrawer();
            }}
          >
            <Text style={styles.text}>ร้านค้า</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>ออเดอร์</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={[styles.text, { color: "red" }]}>ออกจากระบบ</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    marginTop: 60,
    marginLeft: 10,
    //backgroundColor: "#299324FF",
  },

  profileName: {
    fontWeight: "bold",
    fontSize: 17,
    textAlignVertical: "center",
    marginLeft: 10,
  },

  image: {
    width: 50,
    height: 50,
    borderRadius: 150 / 2,
    overflow: "hidden",
    backgroundColor: "gray",
  },

  container2: {
    flex: 1,
    marginLeft: 10,
  },

  text: {
    fontWeight: "bold",
    fontSize: 20,
  },

  button: {
    marginVertical: 10,
  },
  
});
