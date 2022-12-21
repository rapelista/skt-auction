/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { useData } from "../../context";
import { getAuctions, getDataAuction } from "../../service/eth";
import AuctionCard from "../auction_card";
import Landing from "../landing";

export default function Auction() {
  const { isConnected, provider, address, signer } = useData();
  const [all_address, setAddress] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    setAddress([]);

    if (isConnected) {
      getAuctions(provider).then((all_address) => {
        setAddress(all_address);
        all_address.map((address) => {
          getDataAuction(address, signer).then((res) => {
            setData((prev) => {
              return [...prev, [...res, address]];
            });
          });
        });
      });
    }
  }, [isConnected]);

  return (
    <>
      <div className="container">
        {isConnected ? (
          <>
            <div className="border-b-2 w-fit mx-auto pb-3">
              Your address: {address}
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 pt-6 pb-12">
              {data.map((val, i) => {
                if ((i < all_address.length) & val[3]) {
                  return <AuctionCard key={i} data={val} />;
                }
              })}
            </div>
          </>
        ) : (
          <Landing />
        )}
      </div>
    </>
  );
}
