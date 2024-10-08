import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const ProfileScreen = () => {
  return (
    <>
      <View style={styles.container1}>
        <View style={styles.container2}>
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("../assets/favicon.png")}
              style={styles.image}
            />
          </View>
          <Text style={styles.text}>ชื่อ นามสกุล</Text>
          <Text style={styles.text}>Email@gmail.com</Text>
          <TouchableOpacity style={styles.passButton}>
            <Text style={[styles.text, { color: "white" }]}>
              แก้ไข Password
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.passButton, { backgroundColor: "#D12121FF" }]}
          >
            <Text style={[styles.text, { color: "white" }]}>ลบบัญชี</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: "gray",
    padding: 35,
  },
  container2: {
    backgroundColor: "white",
    borderRadius: 50,
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
    backgroundColor: "#3F62D6FF",
    borderRadius: 15,
    alignSelf: 'center',
    padding: 5,
  },
});
