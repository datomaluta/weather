import { useEffect, useState } from "react";

const useUserLocation = () => {
  const [coords, setCoords] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    if (!navigator.geolocation) {
      setError("Geolocation is not supported");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        console.log(err);
        setError(err.message);
        setLoading(false);
      },
      {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 60000,
      }
    );
  }, []);

  return { coords, error, loading };
};

export default useUserLocation;
