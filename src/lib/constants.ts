export type MapInfo = {
  NAME: string;
  TILE_URL: string;
};

export const MAP_TITLE = "国土地理院";
export const MAP_REFERENCE = "https://maps.gsi.go.jp/development/ichiran.html";
export const HAZARD_TITLE = "ハザードマップポータルサイト";
export const HAZARD_REFERENCE =
  "https://disaportal.gsi.go.jp/hazardmap/copyright/opendata.html";
export const SEARCH_API =
  "https://msearch.gsi.go.jp/address-search/AddressSearch?q=";

export const LS_ADDRESSES = "addresses";

export const BASE_MAP: Readonly<MapInfo> = {
  NAME: "標準地図",
  TILE_URL: "https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png",
};

export const WHITE_MAP: Readonly<MapInfo> = {
  NAME: "白地図",
  TILE_URL: "https://cyberjapandata.gsi.go.jp/xyz/blank/{z}/{x}/{y}.png",
};

export const OVERE_VIEW_MAP: Readonly<MapInfo> = {
  NAME: "全国最新写真",
  TILE_URL:
    "https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg",
};

export const HAZARD_KOZUI: Readonly<MapInfo> = {
  NAME: "洪水浸水想定地区",
  TILE_URL:
    "https://disaportaldata.gsi.go.jp/raster/01_flood_l2_shinsuishin_data/{z}/{x}/{y}.png",
};

export const HAZARD_TAKASHIO: Readonly<MapInfo> = {
  NAME: "高潮浸水想定地区",
  TILE_URL:
    "https://disaportaldata.gsi.go.jp/raster/03_hightide_l2_shinsuishin_data/{z}/{x}/{y}.png",
};

export const HAZARD_THUNAMI: Readonly<MapInfo> = {
  NAME: "津波浸水想定地域",
  TILE_URL:
    "https://disaportaldata.gsi.go.jp/raster/03_hightide_l2_shinsuishin_data/{z}/{x}/{y}.png",
};

export const HAZARD_NAISUI: Readonly<MapInfo> = {
  NAME: "内水（雨水出水）浸水想定区域",
  TILE_URL:
    "https://disaportaldata.gsi.go.jp/raster/02_naisui_data/{z}/{x}/{y}.png",
};
