import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import axios from 'axios';

const MapScreen = () => {
  const route = useRoute();
  const { latitude, longitude } = route.params;
  const navigation = useNavigation();

  const origin = { latitude: parseFloat(latitude), longitude: parseFloat(longitude) };
  const destination = { latitude: -6.2935428, longitude: 106.891488 };
  const [routeCoordinates, setRouteCoordinates] = useState([]);

  useEffect(() => {
    navigation.setOptions({ title: 'Map Direction' });
    getRoute();
  }, []);

  const getRoute = async () => {
    try {
      const response = await axios.get(
        `https://router.project-osrm.org/route/v1/driving/${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}?geometries=geojson`
      );

      const routeData = response.data;
      const coordinates = routeData.routes[0].geometry.coordinates.map(coordinate => ({
        latitude: coordinate[1],
        longitude: coordinate[0]
      }));

      setRouteCoordinates(coordinates);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={origin} title="Lokasi Pelanggan" />
        <Marker coordinate={destination} title="Lokasi Mu" />
        <Polyline
          coordinates={routeCoordinates}
          strokeWidth={3}
          strokeColor="hotpink"
        />
      </MapView>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  map: {
    width: '100%',
    height: '50%',
  },
});