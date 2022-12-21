import { createContext, useReducer, useContext } from "react";
import {
  ConnectActions,
  BidActions,
  WalletActions,
  ErrorActions,
  LoadingActions,
} from "./action";

export const AppContext = createContext();

export const useData = () => {
  return useContext(AppContext);
};

const initialState = {
  // event state
  isConnected: false,
  isOnBid: false,
  isNewAuction: false,
  isHasWallet: true,
  isError: false,
  isLoading: false,
  // data state
  provider: null,
  address: null,
  signer: null,
  app_contract: null,
  last_bid: 0,
  address_bid: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case ConnectActions.SET_CONNECT:
      return {
        ...state,
        isConnected: true,
        address: action.payload.address,
        provider: action.payload.provider,
        signer: action.payload.signer,
      };
    case ConnectActions.SET_DISCONNECT:
      return { ...state, isConnected: false };
    case BidActions.SET_ONBID:
      return {
        ...state,
        isOnBid: true,
        last_bid: action.payload.last_bid,
        address_bid: action.payload.address,
      };
    case BidActions.SET_OFFBID:
      return {
        ...state,
        isOnBid: false,
        last_bid: 0,
        address_bid: null,
      };
    case WalletActions.SET_TRUE:
      return { ...state, isHasWallet: true };
    case WalletActions.SET_FALSE:
      return { ...state, isHasWallet: false };
    case ErrorActions.SET_ONERROR:
      return { ...state, isError: true };
    case ErrorActions.SET_OFFERROR:
      return { ...state, isError: false };
    case LoadingActions.SET_ONLOADING:
      return { ...state, isLoading: true };
    case LoadingActions.SET_OFFLOADING:
      return { ...state, isLoading: false };
  }
};

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
