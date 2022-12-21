import { useRef } from "react";
import { useData } from "../../context";
import { BidActions, ErrorActions, LoadingActions } from "../../context/action";
import { setBid } from "../../service/eth";

export default function Bid() {
  const { last_bid, address_bid, isOnBid, signer, dispatch } = useData();
  const bidRef = useRef();

  const bidHandler = async (e) => {
    e.preventDefault();
    const value = bidRef.current.value;
    bidRef.current.value = null;
    dispatch({ type: BidActions.SET_OFFBID });
    dispatch({ type: LoadingActions.SET_ONLOADING });

    if (value != "") {
      try {
        const tx = await setBid(address_bid, value, signer);
        tx.wait().then(() => {
          window.location.reload();
        });
      } catch (error) {
        dispatch({ type: LoadingActions.SET_OFFLOADING });
        dispatch({ type: ErrorActions.SET_ONERROR });
      }
    }
  };

  const cancelHandler = (e) => {
    e.preventDefault();
    dispatch({ type: BidActions.SET_OFFBID });
  };

  return (
    <>
      <div
        className={`bg-black/[.50] fixed top-0 left-0 w-full h-full grid place-items-center ${
          isOnBid ? "" : "invisible"
        }`}
      >
        <div id="form">
          <div className="container">
            <div className="w-72 mx-auto bg-black py-6 px-10 border-2">
              <form className="text-center" onSubmit={bidHandler}>
                <label>Bid Price</label>
                <input
                  type="number"
                  className="mt-2 text-center"
                  min={last_bid}
                  placeholder={`Last Bid = ${last_bid}`}
                  step="any"
                  ref={bidRef}
                  required
                />
                <div className="text-center my-4">
                  <button
                    type="submit"
                    className="hover:bg-sky-500 hover:border-sky-500"
                  >
                    Bid Now
                  </button>
                  <button
                    className="ml-2 hover:bg-red-500 hover:border-red-500"
                    onClick={cancelHandler}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
