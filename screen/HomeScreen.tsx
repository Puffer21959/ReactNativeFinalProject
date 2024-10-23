import { StyleSheet, Text, View,FlatList } from "react-native";
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

//TODO: >Create shop list
//      >make function that fetch both profile and image data

const MaterialHeaderButton = (props: any) => (
  <HeaderButton IconComponent={MaterialIcon} iconSize={23} {...props} />
);

const HomeScreen = ({ route }: any): React.JSX.Element => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const { profile, currentUser, shopStatus } = useAppSelector(selectAuthState);
  const [images, setImages] = useState<any[]>([]);

  const fetchImg = async () => {
    const url = `http://192.168.1.100:3000/api/selectImg?target=${profile}`;
    const response = await axios.get(url);
    setImages(response.data); // Set images in state
  };

  const fetchProfile = async () => {
    const url = `http://192.168.1.100:3000/api/getProfile?currentUser=${currentUser}`;

    const response = await axios.get(url);

    dispatch(setProfile(response.data[0]));

    //console.log(response.data[0]);
  };

  useEffect(() => {
    if (!shopStatus) {
      fetchImg(); // Fetch images if shopStatus is false
    }
  }, [shopStatus]); // Dependency array includes shopStatus

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
    <View>
      <Text>{item.name}</Text> {/* Adjust according to your data structure */}
    </View>
  );
  return (
    <View>
      <Text>ร้านค้า</Text>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()} // Adjust based on your data
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
