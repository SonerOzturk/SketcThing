import { useEffect, useRef } from 'react';
import { getRatingColor } from '../utils/colors';
import { createInfoWindowContent } from './RestaurantInfoWindow';

interface RestaurantMarkerProps {
  map: google.maps.Map;
  place: google.maps.places.PlaceResult;
  onInfoWindowOpen: (infoWindow: google.maps.InfoWindow) => void;
}

const RestaurantMarker: React.FC<RestaurantMarkerProps> = ({ map, place, onInfoWindowOpen }) => {
  const markerRef = useRef<google.maps.Marker | null>(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  useEffect(() => {
    if (!place.geometry?.location || !place.rating) return;

    const marker = new google.maps.Marker({
      position: place.geometry.location,
      map,
      title: place.name,
      label: {
        text: place.rating.toString(),
        color: '#FFFFFF',
        fontSize: '14px',
        fontWeight: 'bold'
      },
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: getRatingColor(place.rating),
        fillOpacity: 1,
        strokeWeight: 0,
        scale: 14
      }
    });

    const infoWindow = new google.maps.InfoWindow({
      content: createInfoWindowContent({
        name: place.name || '',
        vicinity: place.vicinity,
        rating: place.rating,
        userRatingsTotal: place.user_ratings_total
      })
    });

    marker.addListener('click', () => {
      infoWindow.open(map, marker);
      onInfoWindowOpen(infoWindow);
    });

    markerRef.current = marker;
    infoWindowRef.current = infoWindow;

    return () => {
      if (infoWindowRef.current) {
        infoWindowRef.current.close();
      }
      if (markerRef.current) {
        google.maps.event.clearListeners(markerRef.current, 'click');
        markerRef.current.setMap(null);
      }
    };
  }, [map, place, onInfoWindowOpen]);

  return null;
};

export default RestaurantMarker;