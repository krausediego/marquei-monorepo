import { useState } from "react";

interface Coordinates {
  lat: number;
  lng: number;
}

export function useCoordinates(initialCoordinates?: Coordinates) {
  const [coordinates, setCoordinates] = useState<Coordinates>(
    initialCoordinates || {
      lat: -26.3045,
      lng: -48.8487,
    },
  );

  return {
    coordinates,
    setCoordinates,
  };
}
