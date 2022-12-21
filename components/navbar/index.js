/* eslint-disable react-hooks/exhaustive-deps */
import Link from "next/link";
import { useEffect } from "react";
import { useData } from "../../context";
import { ConnectActions, WalletActions } from "../../context/action";
import { getProvider } from "../../service/eth";

export default function Navbar() {
  const { isHasWallet, isConnected, dispatch } = useData();

  const connectMetaMask = async () => {
    const provider = getProvider();
    const address = await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner(address[0]);

    return { provider, address, signer };
  };

  const connectHandler = () => {
    connectMetaMask()
      .then((payload) => {
        dispatch({ type: ConnectActions.SET_CONNECT, payload: payload });
      })
      .catch((error) => {
        console.log(error.code);
      });
  };
  const handleMetamask = () => {
    window.ethereum.request({ method: "eth_accounts" }).then((address) => {
      if (address.length != 0) {
        const provider = getProvider();
        const signer = provider.getSigner(address[0]);
        dispatch({
          type: ConnectActions.SET_CONNECT,
          payload: { provider, address, signer },
        });
      } else {
        dispatch({
          type: ConnectActions.SET_DISCONNECT,
        });
      }
    });
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => {
        handleMetamask();
      });
      handleMetamask();
    } else {
      dispatch({ type: WalletActions.SET_FALSE });
    }
  }, []);

  return (
    <>
      <nav>
        <div className="container">
          <div className="flex justify-between py-6">
            <div id="brand" className="text-5xl">
              <Link href="/">eskate</Link>
            </div>
            <div id="menu" className="text-2xl">
              {isHasWallet &&
                (isConnected ? (
                  <Link
                    href="/add"
                    className="pb-2 border-b-2 border-white hover:border-yellow-500 transition-colors duration-200 ease-in"
                  >
                    Add Auction
                  </Link>
                ) : (
                  <button
                    className="hover:bg-yellow-500 hover:border-yellow-500"
                    onClick={connectHandler}
                  >
                    Connect
                  </button>
                ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
