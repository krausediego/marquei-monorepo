import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { useRef } from "react";
import { Marker, useMapEvents } from "react-leaflet";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

export interface Coordinates {
  lat: number;
  lng: number;
}

interface DraggableMarkerProps {
  position: Coordinates;
  onPositionChange: (position: Coordinates) => void;
}

export function DraggableMarker({
  position,
  onPositionChange,
}: DraggableMarkerProps) {
  const markerRef = useRef<L.Marker>(null);

  const eventHandlers = {
    dragend() {
      const marker = markerRef.current;
      if (marker != null) {
        const newPos = marker.getLatLng();
        onPositionChange({
          lat: newPos.lat,
          lng: newPos.lng,
        });
      }
    },
  };

  useMapEvents({
    click(e) {
      onPositionChange({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    },
  });

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={[position.lat, position.lng]}
      ref={markerRef}
    />
  );
}
