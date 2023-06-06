import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import "firebase/firestore";
import { auth, db } from "../Firebase";
import { doc, setDoc } from "firebase/firestore";
import * as Location from "expo-location";

const BantuanScreen = () => {
  
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [reqBantu, setReqBantu] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongtitude] = useState("");
  const userUid = auth.currentUser.uid;
  
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permintaan Di tolak",
          "Izinkan aplikasi untuk menggunakan layanan lokasi",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ],
          { cancelable: false }
        );
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setLatitude(latitude.toString());
      setLongtitude(longitude.toString());
    })();
  }, []);

  const kirim = async () => {
    if (
      name === "" ||
      address === "" ||
      phoneNumber === "" ||
      reqBantu === ""
    ) {
      Alert.alert(
        "Detail Tidak Valid",
        "tolong Isi Semua Detail",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    }
    await setDoc(doc(db, "pesananUser", `${userUid}`), {
      nama: name,
      alamat: address,
      noTelp: phoneNumber,
      formBantu: reqBantu,
      latitude: latitude,
      longitude: longitude,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Image source={require("../src/img/logo.png")} />
        <Text style={styles.text}>Silakan isi data diri dibawah ini</Text>
        <TextInput
          style={styles.input}
          placeholder="Nama"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Alamat"
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Nomer Telpon"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Mau apa aja yang dibersihin?"
          value={reqBantu}
          onChangeText={(text) => setReqBantu(text)}
        />
      </View>
      
      <TouchableOpacity onPress={() => {
  Alert.alert(
    "Konfirmasi",
    "Apakah Anda yakin ingin mengirim pesanan?",
    [
      {
        text: "Batal",
        style: "cancel",
      },
      {
        text: "Kirim",
        onPress: kirim,
      },
    ],
    { cancelable: true }
  );
}} style={styles.button}>
  <Text style={styles.buttonText}>Kirim</Text>
</TouchableOpacity>
    </ScrollView>
  );
};

export default BantuanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    marginTop: 50,
  },
  input: {
    height: 40,
    borderColor: "#00bbf0",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  text: {
    justifyContent: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    width: 200,
    backgroundColor: "#00bbf0",
    padding: 15,
    borderRadius: 7,
    marginTop: 10,
    marginLeft: "auto",
    marginRight: "auto",
  },
  buttonText: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
  },
});
