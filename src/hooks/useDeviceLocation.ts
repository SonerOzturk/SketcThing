import { useState, useEffect } from 'react';

interface LocationState {
  location: google.maps.LatLngLiteral | null;
  error: Error | null;
}

export const useDeviceLocation = () => {
  const [state, setState] = useState<LocationState>({
    location: null,
    error: null
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState({
        location: null,
        error: new Error('Geolocation is not supported by your browser')
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          error: null
        });
      },
      (error) => {
        setState({
          location: null,
          error: error
        });
      }
    );
  }, []);

  return state;
};