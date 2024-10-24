import { StyleSheet, Text, View, FlatList, Image,TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  HeaderButton,
  HeaderButtons,
  Item,
} from "react-navigation-header-buttons";
import { useNavigation } from "@react-navigation/native";
import {
  selectAuthState,
  setProfile,
} from "../auth/auth-slice";
import { useAppDispatch, useAppSelector } from "../redux-toolkit/hook";
import axios from "axios";

const MaterialHeaderButton = (props: any) => (
  <HeaderButton IconComponent={MaterialIcon} iconSize={23} {...props} />
);

const HomeScreen = ({ route }: any): React.JSX.Element => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const { profile, currentUser, shopStatus, IP } = useAppSelector(selectAuthState);
  const [images, setImages] = useState<any[]>([]);

 /*  const fetchImg = async () => {
    const url = `http://${IP}:3000/api/selectImg?target=${
      currentUser + "Shop"
    }`;
    const response = await axios.get(url);
    setImages(response.data); // Set images in state
  };

  const fetchProfile = async () => {
    const url = `http://${IP}:3000/api/getProfile?currentUser=${currentUser}`;
    const response = await axios.get(url);
    dispatch(setProfile(response.data[0]));
  };
 */
  useEffect(() => {
    const fetchImg = async () => {
      const url = `http://${IP}:3000/api/selectImg?target=${
        currentUser + "Shop"
      }`;
      const response = await axios.get(url);
      setImages(response.data); // Store in state
    };
  
    if (shopStatus) {
      fetchImg();
    }
  }, [shopStatus]);

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

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={checkOpen} >
       <Image
        source={{ uri: `http://${IP}:3000/api/selectImg?target=${
      currentUser + "Shop"
    }` }}
        style={styles.image}
      />
        <Text style={styles.text}>Press Me!</Text>
      </TouchableOpacity>
    </View>
  );

  function checkOpen(){

  }
  return (
    <View style={styles.container}>
      <Text style={styles.Title}>ร้านค้า</Text>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()} // Adjust based on your data
      />
       <TouchableOpacity onPress={checkOpen} >
       <Image
        source={{ uri: `http://${IP}:3000/api/selectImg?target=${
      currentUser + "Shop"
    }` }}
        style={styles.image}
      />
        <Text style={styles.text}>Press Me!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 3.5,
  },
  Title: {
    padding: 2.5,
    fontSize: 30,
    fontWeight: "700",
  },
  text:{
    fontSize: 20,
  },
  itemContainer: {
    marginBottom: 10, // Space between items
    alignItems: "center", // Center items
  },
  image: {
    width: 100, // Set width as needed
    height: 100, // Set height as needed
    borderRadius: 10, // Optional: round corners
  },
});
