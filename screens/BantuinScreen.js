import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { auth, db } from "../Firebase";
import { collection, getDocs } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as geolib from "geolib";

const BantuinScreen = () => {
  const [dataArray, setDataArray] = useState([]);
  const navigation = useNavigation();
  const [sortedDataArray, setSortedDataArray] = useState([]);
  const [isSorted, setIsSorted] = useState(false);

  //kordinat cleaner sekarang
  const pointB = {
    latitude: parseFloat("-6.2935428"),
    longitude: parseFloat("106.891488"),
  };

  // mengambil data kordinat user dari database
  useEffect(() => {
    const fetchArrayData = async () => {
      const colRef = collection(db, "pesananUser");
      const querySnapshot = await getDocs(colRef);

      const tempArray = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        tempArray.push(data);
      });

      const updatedArray = [...dataArray, ...tempArray];

      setDataArray(updatedArray);

      if (!isSorted) {
        setSortedDataArray(sortDataByDefault(updatedArray));
      }
    };

    fetchArrayData();
  }, []);

  //push data kordinat user ke halaman map screen
  const navigateToMap = (latitude, longitude) => {
    navigation.navigate("Map", { latitude, longitude });
  };

  // menghitung jarak antara user dan cleaner
  const calculateDistance = (pointA, pointB) => {
    const distanceInMeters = geolib.getDistance(pointA, pointB);
    const distanceInKilometers = distanceInMeters / 1000;
    return distanceInKilometers;
  };

  const sortDataByDefault = (data) => {
    return [...data].sort((a, b) => {
      const pointA = {
        latitude: parseFloat(a.latitude),
        longitude: parseFloat(a.longitude),
      };
      const pointB = {
        latitude: parseFloat(b.latitude),
        longitude: parseFloat(b.longitude),
      };

      const distanceA = calculateDistance(pointA, pointB);
      const distanceB = calculateDistance(pointA, pointB);

      return distanceA - distanceB;
    });
  };

// implementasi algoritma greedy
  const tombolCariYangTerdekat = () => {
    const sortedArray = [];
    const visited = new Set();

    while (sortedArray.length < dataArray.length) {
      let closestData = null;
      let closestDistance = Infinity;

      for (const data of dataArray) {
        const pointA = {
          latitude: parseFloat(data.latitude),
          longitude: parseFloat(data.longitude),
        };

        if (!visited.has(data) && calculateDistance(pointA, pointB) < closestDistance) {
          closestData = data;
          closestDistance = calculateDistance(pointA, pointB);
        }
      }

      if (closestData) {
        sortedArray.push(closestData);
        visited.add(closestData);
      }
    }

    setSortedDataArray(sortedArray);
    setIsSorted(true);
    // implementasi algoritma greedy
    
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require("../src/img/cleaner.png")} />
      </View>
      <View style={{ marginTop: 12, fontSize: 20 }}>
        <Text style={{ fontSize: 20 }}>Berikut adalah pesanan yang tersedia :</Text>
      </View>
      <View>
        {sortedDataArray.map((data, index) => (
          <View style={styles.itemContainer} key={index}>
            <TouchableOpacity
              style={styles.itemText}
              onPress={() => navigateToMap(data.latitude, data.longitude)}
            >
              <Text style={{ fontSize: 16, color: "white", marginBottom: 8 }}>
                nama : {data.nama}
              </Text>
              <Text style={{ fontSize: 16, color: "white", marginBottom: 8 }}>
                Alamat : {data.alamat}
              </Text>
              <Text style={{ fontSize: 16, color: "white", marginBottom: 8 }}>
                Nomer Telfon : {data.noTelp}
              </Text>
              <Text style={{ fontSize: 16, color: "white", marginBottom: 8 }}>
                Permintaan: {data.formBantu}
              </Text>
              <Text style={{ color: "white" }}>
                Jarak:{" "}
                {calculateDistance(
                  { latitude: parseFloat(data.latitude), longitude: parseFloat(data.longitude) },
                  pointB
                )}{" "}
                Km dari lokasimu
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={tombolCariYangTerdekat}>
        <Text style={styles.buttonText}>Cari yang terdekat</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};


export default BantuinScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    padding: 16,
  },
  itemContainer: {
    backgroundColor: '#00bbf0',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 12
  },
  button: {
    width: 200,
    backgroundColor: "#00bbf0",
    padding: 15,
    borderRadius: 7,
    marginBottom: 50,
    marginTop: 10,
    marginLeft: "auto",
    marginRight: "auto",
    
  },
  buttonText: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
  },
  image: {
    height: 200,
    width: 200,
  },
  imageContainer: {
    marginTop: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
