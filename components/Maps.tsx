import {useRef, useState} from 'react';
import MapView from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {
  Alert,
  Button,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';

const {width, height} = Dimensions.get('screen');
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: height / 1.2,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const Maps = () => {
  const mapRef = useRef<any>(null);
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);

  const handlePress = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      error => {
        Alert.alert(error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      },
    );
  };

  //   useEffect(() => {
  //     handlePress();
  //   }, []);

  //   const onPressHandler = async () => {
  //     console.log(
  //       'mapRef.current.addressForCoordinate',
  //       mapRef.current.addressForCoordinate,
  //     );
  //     const address = await mapRef.current.addressForCoordinate({
  //       latitude: 37.78825,
  //       longitude: -122.4324,
  //     });
  //     console.log('address', address);
  //   };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          showsUserLocation={true}
          provider={'google'}
          style={styles.map}
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={(event: any) => {
            setLongitude(event.nativeEvent.coordinate.longitude);
            setLatitude(event.nativeEvent.coordinate.latitude);

            Geocoder.from(event.nativeEvent.coordinate)
              .then(json => {
                const address = json.results[0].address_components[0];
                console.log(address.long_name);
              })
              .catch(err => console.log(err));
          }}
        />
        <View>
          <Button title="Get current location" onPress={() => handlePress()} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Maps;
