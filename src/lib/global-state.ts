import { atom } from "jotai";
import { BASE_MAP } from "./constants";

export const addressesAtom = atom<{id:number, name: string, lat: number, lng: number}[]>([]);
export const mapUrlAtom = atom<string>(BASE_MAP.TILE_URL);
export const hazardUrlAtom = atom<string>("");