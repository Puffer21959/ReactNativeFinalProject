import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

//TODO: >Make it look better
//      >Connect to Database

const ProfileScreen = (): React.JSX.Element => {
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

      //see what's the ImagePick
      //console.log(result);

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
        <View style={styles.container2}>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity onPress={pickImage}>
              <Image source={{ uri: image }} style={styles.image} />
            </TouchableOpacity>
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
    alignSelf: "center",
    padding: 5,
  },
});
