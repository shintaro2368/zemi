import { useSetAtom } from "jotai";
import { useState } from "react";
import { LS_ADDRESSES, SEARCH_API } from "../lib/constants";
import { addressesAtom } from "../lib/global-state";

export default function AddressSearch() {
  const [address, setAddress] = useState("");
  const [areaName, setAreaName] = useState("");
  const [isSeach, setIsSearch] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const setAddresses = useSetAtom(addressesAtom);

  async function handleSearch() {
    setIsSearch(true);
    try {
      const res = await fetch(`${SEARCH_API}${address}`);
      const json = await res.json();

      if (json?.length > 0) {
        const pos = json[0]["geometry"]["coordinates"];
        const newAddress = {
          id: new Date().getTime(),
          name: areaName,
          lat: pos[1] as number,
          lng: pos[0] as number,
        };

        const addressStr = localStorage.getItem(LS_ADDRESSES);
        if (addressStr) {
          const address = JSON.parse(addressStr) as any[];
          address.push(newAddress);
          localStorage.setItem(LS_ADDRESSES, JSON.stringify(address));
        } else {
          localStorage.setItem(LS_ADDRESSES, JSON.stringify([newAddress]));
        }

        setAddresses((prev) => [...prev, newAddress]);
      } else {
        alert(
          "住所から緯度経度を検索することができませんでした。\n入力内容をご確認ください。"
        );
      }
    } catch (e) {
      alert("ジオコーディングに失敗しました。");
    } finally {
      setIsSearch(false);
      setShowDialog(false);
      setAddress("");
      setAreaName("");
    }
  }

  return (
    <>
      <div className="d-flex m-2">
        <input
          className="form-control me-2"
          type="text"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="住所を入力"
        />
        <button
          className={`w-25 btn btn-primary ${isSeach ? "disabled" : ""}`}
          onClick={() => setShowDialog(true)}
        >
          追加
        </button>
      </div>
      {isSeach && <p>位置情報を取得中...</p>}
      {showDialog && (
        <div className="modal show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">エリア作成</h5>
                <button type="button" className="btn-close"></button>
              </div>
              <div className="modal-body">
                <p>エリアの名前を入力してください。</p>
                <input
                  type="text"
                  className="form-control"
                  value={areaName}
                  onChange={(e) => setAreaName(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setAreaName("");
                    setShowDialog(false);
                  }}
                >
                  キャンセル
                </button>
                <button
                  type="button"
                  className={`btn btn-primary ${isSeach ? "disabled" : ""}`}
                  onClick={() => handleSearch()}
                >
                  保存
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
