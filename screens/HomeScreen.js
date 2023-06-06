import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../Firebase";
import { signOut } from "firebase/auth";
const HomeScreen = () => {
  const navigation = useNavigation();

  const user = auth.currentUser;
  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <View
      style={{
        marginVertical: 150,
        alignItems: "center",
      }}
    >
      <Image source={require("../src/img/logo.png")} />
      <View style={{ paddingBottom: 20 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Bantuan")}
          style={{
            backgroundColor: "#00bbf0",
            paddingHorizontal: 100,
            paddingVertical: 10,
            borderRadius: 5,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white" }}>Mau Di Bantuin?</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Bantuin")}
          style={{
            backgroundColor: "#00bbf0",
            paddingHorizontal: 114,
            paddingVertical: 10,
            borderRadius: 5,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white" }}>Bantuin Yuk</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={signOutUser}
          style={{
            backgroundColor: "#00bbf0",
            paddingHorizontal: 114,
            paddingVertical: 10,
            borderRadius: 5,
            alignItems: "center",
            marginTop: 50,
          }}
        >
          <Text style={{ color: "white" }}>Keluar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
