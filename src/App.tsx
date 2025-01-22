import Bounds from "./components/Bound";
import HazardLayer from "./components/HazardLayer";
import MapLalyer from "./components/MapLayer";
import SideBar from "./components/SideBar";
import HazardLegend from "./components/HazardLegend";

import "bootstrap/dist/css/bootstrap.min.css";
import { useAtomValue, useSetAtom } from "jotai";
import { LatLngLiteral, icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup } from "react-leaflet";
import { LS_ADDRESSES } from "./lib/constants";
import { addressesAtom, currentCenterAtom } from "./lib/global-state";

function App() {
  const [currentPosition, setCurrentPosition] = useState<LatLngLiteral>({lat: 36, lng:138})
  const setAddresses = useSetAtom(addressesAtom);
  const addressesValue = useAtomValue(addressesAtom);

  const setCurrentCenter = useSetAtom(currentCenterAtom);
  const currentCenterValue = useAtomValue(currentCenterAtom);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setCurrentPosition({ lat: latitude, lng: longitude });
        setCurrentCenter({lat: latitude, lng: longitude})
      },
      (e) => {
        if (e.code === GeolocationPositionError.PERMISSION_DENIED) {
          alert(
            "このアプリケーションを利用するには位置情報に関する権限を許可してください。"
          );
        } else {
          alert("位置情報の取得に失敗しました。");
          console.error("code", e.code, "message", e.message);
        }
      }
    );

    const addressesStr = localStorage.getItem(LS_ADDRESSES);
    if (addressesStr) {
      setAddresses(JSON.parse(addressesStr));
    }
  }, []);

  return (
    <div className="d-flex position-relative">
      <HazardLegend/>
      <SideBar />
      <MapContainer
        style={{ height: "100vh", width: "calc(100vw - 400px)" }}
        center={{lat: currentCenterValue.lat, lng: currentCenterValue.lng}}
        maxZoom={17}
      >
        <MapLalyer />
        <Bounds position={{lat: currentCenterValue.lat, lng: currentCenterValue.lng}} />
        <HazardLayer />
        <Marker
          position={currentPosition}
          title="現在地"
          icon={icon({ iconUrl: "./person.png", iconSize: [36, 36] })}
        >
          <Popup>現在地</Popup>
        </Marker>
        {addressesValue.map((address) => (
          <Marker
            key={address.id}
            position={{ lat: address.lat, lng: address.lng }}
            title={address.name}
          >
            <Popup>{address.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default App;
