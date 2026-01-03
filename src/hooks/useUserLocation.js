import { useEffect, useState } from "react";

const useUserLocation = () => {
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("idle");
  // idle | loading | success | error

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStatus("loading");

    if (!navigator.geolocation) {
      setError("Geolocation is not supported");
      setStatus("error");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setStatus("success");
      },
      (err) => {
        console.error(err);
        if (err.code === 1) {
          setError("Please allow location access");
        } else {
          setError("Error getting location");
        }
        setStatus("error");
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  }, []);

  return { coords, error, status };
};

export default useUserLocation;
