import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";

import { selectAuthState } from "../auth/auth-slice";
import { useAppSelector } from "../redux-toolkit/hook";
import axios from "axios";
import Axios from "axios";

//TODO: >Make it look better

const ProfileScreen = (): React.JSX.Element => {
  const [image, setImage] = useState<string>(
    Image.resolveAssetSource(require("../assets/favicon.png")).uri
  );
  const [fetchResult, setResult] = useState(false);

  const { currentUser, profile } = useAppSelector(selectAuthState);

  const fetchImg = async () => {
    try {
      const url = `http://192.168.1.165:3000/api/selectImg?target=${
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
      }
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
          Axios.put("http://192.168.1.165:3000/api/updateImg", {
            ImageData: result.assets[0].uri,
            ImageID: currentUser + "Profile",
          });
          console.log("update");
        } else if (!fetchResult) {
          Axios.post("http://192.168.1.165:3000/api/uploadImg", {
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
