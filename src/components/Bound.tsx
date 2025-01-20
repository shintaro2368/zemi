import { LatLngLiteral } from "leaflet";
import { useMap } from "react-leaflet";

export default function Bounds({ position }: { position: LatLngLiteral }) {
  const map = useMap();
  map.fitBounds([
    [position.lat, position.lng],
    [position.lat, position.lng],
  ]);
  return null;
}
