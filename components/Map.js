import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { useRoute } from "@react-navigation/native";


const Map = () => {
  const route = useRoute();
  const { latitude, longitude } = route.params;
 
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "black"}}>
      <Text style={{ fontSize: 18 }}>Latitude: {latitude}</Text>
      {/* <Text style={{ fontSize: 18 }}>Longitude: {longitude}</Text> */}
      {/* Tampilkan peta atau marker dengan menggunakan data latitude dan longitude */}
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({

});
