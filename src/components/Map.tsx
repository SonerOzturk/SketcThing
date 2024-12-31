import React, { useEffect, useRef, useState } from 'react';
import { useGoogleMaps } from '../hooks/useGoogleMaps';
import { mapStyles } from '../utils/mapStyles';
import RestaurantMarker from './RestaurantMarker';
import { useDeviceLocation } from '../hooks/useDeviceLocation';

interface MapProps {
  center: google.maps.LatLngLiteral;
  zoom: number;
}

const Map: React.FC<MapProps> = ({ center: defaultCenter, zoom }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [places, setPlaces] = useState<google.maps.places.PlaceResult[]>([]);
  const { isLoaded, error } = useGoogleMaps();
  const { location: deviceLocation, error: locationError } = useDeviceLocation();
  const activeInfoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  // Close active info window when clicking on map
  useEffect(() => {
    if (!map) return;
    
    const listener = map.addListener('click', () => {
      if (activeInfoWindowRef.current) {
        activeInfoWindowRef.current.close();
      }
    });

    return () => google.maps.event.removeListener(listener);
  }, [map]);

  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;

    const initialCenter = deviceLocation || defaultCenter;
    
    const mapInstance = new google.maps.Map(mapRef.current, {
      center: initialCenter,
      zoom,
      styles: mapStyles
    });
    setMap(mapInstance);

    const service = new google.maps.places.PlacesService(mapInstance);

    mapInstance.addListener('idle', () => {
      const bounds = mapInstance.getBounds();
      if (bounds) {
        const request: google.maps.places.PlaceSearchRequest = {
          bounds,
          type: 'restaurant'
        };

        service.nearbySearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            // Filter out places with no ratings
            const filteredResults = results.filter(place => place.rating && place.rating > 0);
            setPlaces(filteredResults);
          }
        });
      }
    });
  }, [isLoaded, defaultCenter, zoom, deviceLocation]);

  if (error || locationError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-red-50 rounded-lg">
        <p className="text-red-500">Harita yüklenirken bir hata oluştu.</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-lg">
        <p className="text-gray-500">Harita yükleniyor...</p>
      </div>
    );
  }

  return (
    <div ref={mapRef} className="w-full h-full rounded-lg shadow-lg">
      {map && places.map((place, index) => (
        <RestaurantMarker 
          key={`${place.place_id}-${index}`}
          map={map} 
          place={place}
          onInfoWindowOpen={(infoWindow) => {
            if (activeInfoWindowRef.current) {
              activeInfoWindowRef.current.close();
            }
            activeInfoWindowRef.current = infoWindow;
          }}
        />
      ))}
    </div>
  );
};

export default Map;