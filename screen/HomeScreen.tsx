import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  HeaderButton,
  HeaderButtons,
  Item,
} from "react-navigation-header-buttons";
import { useNavigation } from "@react-navigation/native";
import { selectAuthState, setProfile } from "../auth/auth-slice";
import { useAppDispatch, useAppSelector } from "../redux-toolkit/hook";
import axios from "axios";
import Axios from "axios";

const MaterialHeaderButton = (props: any) => (
  <HeaderButton IconComponent={MaterialIcon} iconSize={23} {...props} />
);

const HomeScreen = ({ route }: any): React.JSX.Element => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const { profile, currentUser, IP } = useAppSelector(selectAuthState);
  const [images, setImages] = useState<any[]>([]);
  const [status, setStatus] = useState(profile?.IsOpen || false);
  const [itemData, setItemData] = useState<any>({});

  const fetchShop = async () => {
    try {
      const url = `http://${IP}:3000/api/checkOpen?IsOpen=${1}&ID=${currentUser}`;
      const response = await axios.get(url);

      console.log(response.data);

      setItemData(response.data);
      console.log(itemData);

      // if (!response.ok) {
      //   const errorText = await response.text();
      //   throw new Error(`Error fetching shop data: ${response.status} ${errorText}`);
      // }

      // const text = await response.text();
      // console.log("Raw response text:", text); // Log the raw response

      // if (!text) {
      //   throw new Error("Received empty response");
      // }

      // const data = JSON.parse(text);
      // console.log("Fetched data:", data); // Log the full data response

      // // Check if data is an array
      // if (Array.isArray(data) && data.length > 0) {
      //   const isOpen = data[0].IsOpen; // Access IsOpen from the first item
      //   console.log("IsOpen value:", isOpen); // Log the value for debugging

      //   if (isOpen === 1 || isOpen === "1" || isOpen === true) {
      //     const targetUrl = `http://${IP}:3000/api/selectImg?target=${currentUser+"shop"}`;
      //     const imgResponse = await axios.get(targetUrl);
      //     setImages(imgResponse.data);
      //     console.log("Shop is open");
      //   } else {
      //     console.log("Shop is closed");
      //   }
      // } else {
      //   console.log("No data returned from the API.");
      // }
    } catch (error) {
      console.error("Error fetching shop data:", error);
    }
  };

  useEffect(() => {
    fetchShop();
    console.log(itemData);
  }, []);

  useEffect(() => {
    if (profile) {
      setStatus(profile.IsOpen);
    }
  }, [profile]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
          <Item
            title="cart"
            iconName="cart-outline"
            onPress={() => navigation.navigate("Cart")}
          />
          <Item
            title="profile"
            iconName="account"
            onPress={() => navigation.openDrawer()}
          />
        </HeaderButtons>
      ),
    });
  });

  const _renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => handleImagePress(item)}>
      <View style={styles.itemContainer}>
        <Text style={styles.shopName}>{item.ShopName}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleImagePress = (item: any) => {
    console.log("Image pressed:", item);
    navigation.navigate("Store", item.ID);
  };

  return (
    <View>
        <Text style={styles.Title}>ร้านค้า</Text>
    <View style={styles.container}>
      <FlatList
        data={itemData}
        renderItem={_renderItem}
        keyExtractor={(item, index) => JSON.stringify(item)}
      />
    </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 20,
    marginTop: "0%",
    borderRadius: 10, // เพิ่มความมนให้กบัขอบคอนเทนเนอร์
    width: "100%", // ต้งัความกวา้งของ container ให้เต็มหน้าจอ
    alignSelf: "flex-start",
  },
  shopName: {
    padding: 2.5,
    fontSize: 20,
    color: "white",
    alignSelf:"flex-start",
    marginLeft:"5%",
    fontWeight: "500",
  },
  Title: {
    padding: 2.5,
    fontSize: 30,
    fontWeight: "700",
    marginTop:"5%",
    marginLeft:"5%"
  },

  itemContainer: {
    marginBottom: 10, // Space between items
    alignItems: "center", // Center items
    backgroundColor: "#4F6C8B",
    borderRadius: 10,
  },


});
