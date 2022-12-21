import Head from "next/head";
import { AppProvider } from "../context";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <AppProvider>
      <Head>
        <meta
          name="description"
          content="Auction website based on smart contract in ETH - SKT"
        />
        <meta name="viewport" content="viewport-fit=cover" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </AppProvider>
  );
}
