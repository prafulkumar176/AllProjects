import React, {Component, createRef} from 'react';
import {Alert, StyleSheet} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView from 'react-native-maps';

// Geocoder.init('AIzaSyCVa5-vHiqebRa3saaTYMnN436o9W8PP8U', {language: 'en'});

interface IProps {
  mapRef: any;
}

interface IState {
  longitude: number;
  latitude: number;
  CurrentAddress: object;
}
export default class MapsInClass extends Component<IProps, IState> {
  mapRef: any;
  constructor(props: IProps) {
    super(props);
    this.state = {longitude: 0, latitude: 0, CurrentAddress: {}};
    this.mapRef = React.createRef();
  }

  //   requestCameraPermission = async () => {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //         {
  //           title: 'Fipola App Map Permission',
  //           message:
  //             'Fipola App needs access to your current location ' +
  //             'so you can identify current location.',
  //           buttonNeutral: 'Ask Me Later',
  //           buttonNegative: 'Cancel',
  //           buttonPositive: 'OK',
  //         },
  //       );
  //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //         console.log('You can use the camera');
  //       } else {
  //         console.log('Camera permission denied');
  //         openSettings();
  //       }
  //     } catch (err) {
  //       console.warn(err);
  //     }
  //   };

  getData = async (event: any) => {
    const data = await this.mapRef.current.addressForCoordinate({
      latitude: event.latitude,
      longitude: event.longitude,
    });

    // this.setState({CurrentAddress : data})
  };
  handlePress = () => {
    Geolocation.getCurrentPosition(
      (position: any) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },

      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  componentDidMount(): void {
    this.handlePress();
  }
  render() {
    return (
      <MapView
        showsUserLocation={true}
        provider="google"
        style={styles.mapStyles}
        region={{
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        testID="mapView"
        ref={this.mapRef}
        onPress={event => {
          this.setState({
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude,
          });

          this.getData(event.nativeEvent.coordinate);
        }}>
        {/* <Marker
          onDragEnd={(e: any) => {
            this.setState({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            });
            console.log('dragEnd', e.nativeEvent.coordinate.latitude);
          }}
          draggable
          coordinate={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
          }}
        /> */}
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  mapStyles: {
    height: '80%',
    width: '100%',
  },
});
