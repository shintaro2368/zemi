import { atom } from "jotai";
import { BASE_MAP } from "./constants";

export const currentCenterAtom = atom<{ id?: number; lat: number; lng: number }>({
  lat: 36,
  lng: 138,
});
export const addressesAtom = atom<
  { id: number; name: string; lat: number; lng: number }[]
>([]);
export const mapUrlAtom = atom<string>(BASE_MAP.TILE_URL);
export const hazardUrlAtom = atom<string>("");
