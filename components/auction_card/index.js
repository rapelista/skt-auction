/* eslint-disable @next/next/no-img-element */

import { ethers } from "ethers";
import { useState } from "react";
import { useData } from "../../context";
import { BidActions, ErrorActions, LoadingActions } from "../../context/action";
import { finishAuction } from "../../service/eth";

export default function AuctionCard(props) {
  const { data } = props;
  const { signer, address, dispatch } = useData();
  const [hover, setHover] = useState(false);

  const bidHandler = () => {
    dispatch({
      type: BidActions.SET_ONBID,
      payload: {
        last_bid: ethers.utils.formatEther(data[6]),
        address: data[7],
      },
    });
  };

  const finishHandler = async () => {
    dispatch({ type: LoadingActions.SET_ONLOADING });
    try {
      const tx = await finishAuction(data[7], signer);
      tx.wait().then(() => {
        window.location.reload();
      });
    } catch (error) {
      dispatch({ type: LoadingActions.SET_OFFLOADING });
      dispatch({ type: ErrorActions.SET_ONERROR });
    }
  };

  return (
    <>
      <div id="card" className="relative overflow-hidden">
        <div
          className={`absolute z-10 w-full aspect-square pointer-events-none lg:p-8 grid place-items-center ${
            !hover && "scale-0"
          } transition-transform duration-300 ease-in-out`}
        >
          <div className="backdrop-blur-sm bg-black/30 w-full aspect-square grid place-items-center p-8 text-center overflow-hidden">
            {data[1]}
          </div>
        </div>
        <div id="card-img" className="overflow-hidden">
          <img
            src={data[5]}
            alt="1"
            className="w-full hover:scale-110 transition duration-300 ease-out aspect-square object-cover object-center"
            onPointerEnter={() => {
              setHover(true);
            }}
            onPointerLeave={() => {
              setHover(false);
            }}
          />
        </div>
        <div id="card-body">
          <span id="item_name" className="text-xl">
            {data[0]}
          </span>
          <span id="last_name" className="text-xl">
            Last Bid = {ethers.utils.formatEther(data[6])} ETH
          </span>
          <div className="text-center py-4">
            {address[0] != data[4].toLowerCase() && (
              <button
                className="hover:bg-sky-500 hover:border-sky-500 mr-2"
                onClick={bidHandler}
              >
                Bid Now
              </button>
            )}
            {address[0] == data[4].toLowerCase() && (
              <button
                className="hover:bg-green-500 hover:border-green-500"
                onClick={finishHandler}
              >
                Finish Bid
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
