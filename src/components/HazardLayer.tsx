import { useAtomValue } from "jotai";
import { TileLayer } from "leaflet";
import { useMap } from "react-leaflet";
import { hazardUrlAtom } from "../lib/global-state";

export default function HazardLayer() {
  const map = useMap();
  const hazardUrlValue = useAtomValue(hazardUrlAtom);

  map.eachLayer((el) => {
    if (el instanceof TileLayer) {
      const tl = el as TileLayer;
      if (tl.options.id === "hazardLayer") {
        map.removeLayer(el);
      }
    }
  });

  if (!hazardUrlValue) return null;

  map.addLayer(
    new TileLayer(hazardUrlValue, {
      opacity: 0.8,
      id: "hazardLayer",
      minZoom: 2,
      maxZoom: 17,
    })
  );
  return null;
}
