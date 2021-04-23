import { useState } from "react";
import useGeolocation from "react-hook-geolocation";

export default function useLocations() {
  const [locations, setLocations] = useState([]);
  const location = useGeolocation({
    enableHighAccuracy: true, 
    maximumAge:         5000, 
    timeout:            5000,
  });

  if (locations.indexOf(location) === -1 && location.latitude && location.longitude) {
    setLocations([...locations, location]);
  }

  return locations;
}