import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  HeaderButton,
  HeaderButtons,
  Item,
} from "react-navigation-header-buttons";
import { useNavigation } from "@react-navigation/native";

const MaterialHeaderButton = (props: any) => (
  <HeaderButton IconComponent={MaterialIcon} iconSize={23} {...props} />
);

const HomeScreen = (): React.JSX.Element => {
  const navigation = useNavigation<any>();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
          <Item
            title="cart"
            iconName="cart-outline"
            onPress={() => console.log("gotoCart")}
          />
          <Item
            title="profile"
            iconName="account"
            onPress={() => console.log("gotoProfile")}
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
