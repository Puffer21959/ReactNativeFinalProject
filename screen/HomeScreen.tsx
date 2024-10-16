import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  HeaderButton,
  HeaderButtons,
  Item,
} from "react-navigation-header-buttons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { selectAuthState, setProfile, setGallery } from "../auth/auth-slice";
import { useAppDispatch, useAppSelector } from "../redux-toolkit/hook";

//TODO: >Create shop list

const MaterialHeaderButton = (props: any) => (
  <HeaderButton IconComponent={MaterialIcon} iconSize={23} {...props} />
);

const HomeScreen = ({ props }: any): React.JSX.Element => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector(selectAuthState);

  useFocusEffect(() => {
    dispatch(setProfile("testUser"));
    console.log(profile);
  });

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
