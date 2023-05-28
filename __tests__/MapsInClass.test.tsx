import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import MapsInClass from '../components/MapsInClass';

jest.mock('@react-native-community/geolocation', () => {
  return {
    getCurrentPosition: jest
      .fn()
      .mockImplementation((callback, errorCallback) => {
        callback({coords: {latitude: 123, longitude: 321}});
        // errorCallback('');
      }),
  };
});
jest.mock('react-native-maps', () => 'MapView');

describe('Maps component to be rendered', () => {
  test('renders correctly', () => {
    const {getByTestId} = render(<MapsInClass mapRef={undefined} />);
    const mapview = getByTestId('mapView');
    fireEvent.press(mapview);
  });

  //   test('Onpress on map', async () => {
  //     let mapRefMock: any;

  //     beforeEach(() => {
  //       // Create a mock for mapRef
  //       mapRefMock = {
  //         current: {
  //           addressForCoordinate: jest
  //             .fn()
  //             .mockResolvedValue('123 Main St, City'),
  //         },
  //       };
  //     });

  //     it('should call addressForCoordinate with the correct latitude and longitude', async () => {
  //       // Render the component with the mapRef mock
  //       const {getByText} = await render(<MapsInClass mapRef={mapRefMock} />);
  //       const mapview = await getByText('getData');
  //       console.log(mapview);

  //       // Simulate an event object with latitude and longitude
  //       const event = {
  //         nativeEvent: {
  //           coordinate: {
  //             latitude: 37.7749,
  //             longitude: -122.4194,
  //           },
  //         },
  //       };

  //       // Trigger the onClick function with the simulated event
  //    fireEvent.press(mapview, {nativeEvent: event});

  //         expect(mapRefMock.current.addressForCoordinate).toBeTruthy()
  //     });
  //   });

  test('should update latitude, longitude, and call getData on button press', async () => {
    const mapRefMock = {
      current: {
        addressForCoordinate: jest.fn().mockResolvedValue('123 Main St, City'),
      },
    };
    const {getByTestId} = render(<MapsInClass mapRef={mapRefMock} />);

    // Simulate button press
    const MapView = getByTestId('mapView');
    fireEvent.press(MapView, {
      nativeEvent: {
        coordinate: {
          latitude: 37.123,
          longitude: -122.456,
        },
      },
    });

    // Get reference to the component instance
    const myComponentInstance = MapView.instance;

    // Verify state updates
    expect(myComponentInstance.state.latitude).toBe(37.123);
    expect(myComponentInstance.state.longitude).toBe(-122.456);

    // Verify getData is called with correct coordinates
    await expect(myComponentInstance.getData).toHaveBeenCalledWith({
      latitude: 37.123,
      longitude: -122.456,
    });

    await expect(myComponentInstance.getData).toBeTruthy();

    // Verify the result of the mocked API call
    // await waitFor(() =>
    //   expect(myComponentInstance.state.CurrentAddress).toBe('Mocked Address'),
    // );
    await expect(myComponentInstance.state.CurrentAddress).toBe(
      'Mocked Address',
    );
  });
});
