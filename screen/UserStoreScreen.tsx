import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

//TODO: >Add Flatlist that can click to add item
//      >Connect to Database

const UserStoreScreen = (): React.JSX.Element => {
  const [image, setImage] = useState<string>(
    Image.resolveAssetSource(require("../assets/favicon.png")).uri
  );

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log(result);

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        //console.log(image);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View style={styles.container1}>
        <Image source={{ uri: image }} style={styles.background} />

        <View style={styles.container2}>
          <TouchableOpacity onPress={pickImage}>
            <Image source={{ uri: image }} style={styles.storeImage} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Text
              style={{ color: "#FFFFFFFF", fontWeight: "bold", fontSize: 22 }}
            >
              เปิดร้าน
            </Text>
          </TouchableOpacity>

          <View style={styles.container3}>
            <Text style={{ fontWeight: "bold", fontSize: 22 }}>
              ชื่อร้านค้า
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
              {/* Flatlist with button to add item */}
            </View>
          </View>
        </View>
      </View>
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
});
