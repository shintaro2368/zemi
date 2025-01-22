import { useAtomValue } from "jotai";
import { TileLayer } from "react-leaflet";
import { MAP_REFERENCE, MAP_TITLE } from "../lib/constants";
import { mapUrlAtom } from "../lib/global-state";

export default function MapLalyer() {
  const mapUrlValue = useAtomValue(mapUrlAtom);

  return (
    <TileLayer
      url={mapUrlValue}
      attribution={`出典: <a target="_blank" href="${MAP_REFERENCE}">${MAP_TITLE}</a>`}
    />
  );
}
