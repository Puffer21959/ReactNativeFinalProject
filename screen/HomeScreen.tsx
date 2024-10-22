import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
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
  const { profile, currentUser } = useAppSelector(selectAuthState);

  useEffect(() => {
    console.log(currentUser);    
    //get user ID
    //dispatch(setCurrentUser(route.params.userID[0].ID));
    //console.log(route.params.userID[0].ID + 'route');
    //console.log(currentUser + "user");

    //fetchProfile();

    //console.log(profile + " Homeprofile");
  }, []);

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

  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
