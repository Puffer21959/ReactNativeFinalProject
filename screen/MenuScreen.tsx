import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../redux-toolkit/hook";
import { selectAuthState } from "../auth/auth-slice";
import { setProfile } from "../auth/auth-slice";
import axios from "axios";

const MenuScreen = ({ navigation, route }: any): React.JSX.Element => {
  const [image, setImage] = useState<string>(
    Image.resolveAssetSource(require("../assets/favicon.png")).uri
  );
  const [userName, setUserName] = useState<string>("ชื่อ นามสกุล");

  const { currentUser, profile } = useAppSelector(selectAuthState);
  const dispatch = useAppDispatch();

  const fetchProfile = async () => {
    const url = `http://192.168.1.165:3000/api/getProfile?currentUser=${currentUser}`;

    const response = await axios.get(url);

    dispatch(setProfile(response.data[0]));
    setUserName(response.data[0].Name);

    //console.log(response.data[0]);
  };

  const fetchImg = async () => {
    try {
      const url = `http://192.168.1.165:3000/api/selectImg?target=${
        currentUser + "Profile"
      }`;
      //console.log(currentUser);

      const res = await axios.get(url);

      if (res.data != "") {
        //console.log("Image is: " + res.data[0].ImageData);
        setImage(res.data[0].ImageData);
      } else {
        console.log("no Img result");
        //console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  useEffect(() => {
    navigation.addListener("focus", () => {
      fetchImg();
      fetchProfile();
      //console.log(profile + " focus");
    });
    //console.log(image);
  }, []);

  return (
    <>
      <View style={styles.container1}>
        <View style={{ flexDirection: "row" }}>
          <Image source={{ uri: image }} style={styles.image} />
          <Text style={styles.profileName}>{userName}</Text>
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
