import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import {
  type Coordinates,
  DraggableMarker,
} from "./components/draggable-marker";
import { MapUpdater } from "./components/map-updater";

interface AddressMapProps {
  initialPosition?: Coordinates;
  onPositionChange: (position: Coordinates) => void;
  address?: string;
}

// Estilos de mapa disponíveis
const MAP_STYLES = {
  // Mais limpo e minimalista
  cartoDB: {
    url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  },
  // Ainda mais limpo
  cartoDBVoyager: {
    url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  },
  // Escuro/Dark mode
  cartoDBDark: {
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  },
  // Padrão OpenStreetMap (o que você está usando)
  openStreetMap: {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
  // Estilo mais moderno
  stamenToner: {
    url: "https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.png",
    attribution:
      '&copy; <a href="https://www.stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
  },
  apple: {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
};

export function AddressMap({
  initialPosition = { lat: -26.3045, lng: -48.8487 },
  onPositionChange,
  address,
}: AddressMapProps) {
  const [position, setPosition] = useState<Coordinates>(initialPosition);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Escolha o estilo aqui - recomendo 'cartoDB' ou 'cartoDBVoyager' para mapas limpos
  const selectedStyle = MAP_STYLES.cartoDBVoyager;

  // Prevenir propagação de eventos do mapa para o dialog
  useEffect(() => {
    const mapContainer = mapContainerRef.current;
    if (!mapContainer) return;

    const stopPropagation = (e: Event) => {
      e.stopPropagation();
    };

    mapContainer.addEventListener("mousedown", stopPropagation);
    mapContainer.addEventListener("touchstart", stopPropagation);
    mapContainer.addEventListener("pointerdown", stopPropagation);

    return () => {
      mapContainer.removeEventListener("mousedown", stopPropagation);
      mapContainer.removeEventListener("touchstart", stopPropagation);
      mapContainer.removeEventListener("pointerdown", stopPropagation);
    };
  }, []);

  useEffect(() => {
    if (!address) return;

    const geocodeAddress = async () => {
      setIsGeocoding(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            address,
          )}&limit=1`,
        );

        const data = await response.json();

        if (data && data.length > 0) {
          const newPosition = {
            lat: parseFloat(data[0].lat),
            lng: parseFloat(data[0].lon),
          };
          setPosition(newPosition);
          onPositionChange(newPosition);
        }
      } catch (error) {
        console.error("Erro ao geocodificar endereço:", error);
      } finally {
        setIsGeocoding(false);
      }
    };

    const timer = setTimeout(() => {
      geocodeAddress();
    }, 1000);

    return () => clearTimeout(timer);
  }, [address, onPositionChange]);

  const handlePositionChange = (newPosition: Coordinates) => {
    setPosition(newPosition);
    onPositionChange(newPosition);
  };

  return (
    <div className="relative" ref={mapContainerRef}>
      <div className="h-[280px] w-full">
        <MapContainer
          center={[position.lat, position.lng]}
          zoom={16}
          className="z-0 h-full w-full"
          scrollWheelZoom={true}
          dragging={true}
          touchZoom={true}
          doubleClickZoom={true}
          zoomControl={true}
        >
          <TileLayer
            attribution={selectedStyle.attribution}
            url={selectedStyle.url}
          />
          <DraggableMarker
            position={position}
            onPositionChange={handlePositionChange}
          />
          <MapUpdater position={position} />
        </MapContainer>
      </div>

      {isGeocoding && (
        <div className="bg-background/95 pointer-events-none absolute top-2 right-2 z-1000 rounded-md border px-2 py-1 text-xs shadow-lg backdrop-blur-sm">
          Buscando localização...
        </div>
      )}

      <div className="text-muted-foreground mt-2 space-y-0.5 px-1 text-xs">
        <p>Arraste o marcador ou clique no mapa para ajustar</p>
        <p className="font-mono text-[10px]">
          {position.lat.toFixed(6)}, {position.lng.toFixed(6)}
        </p>
      </div>
    </div>
  );
}
