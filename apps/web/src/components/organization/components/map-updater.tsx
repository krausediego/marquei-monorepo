import { useEffect } from "react";
import { useMap } from "react-leaflet";
import type { Coordinates } from "./draggable-marker";

export function MapUpdater({ position }: { position: Coordinates }) {
  const map = useMap();

  useEffect(() => {
    map.setView([position.lat, position.lng], 16, {
      animate: true,
    });
  }, [position, map]);

  return null;
}
