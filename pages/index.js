import Head from "next/head";

import Auction from "../components/auction";
import Bid from "../components/bid_modal";

import { useData } from "../context";
import Layout from "../components/layout";

export default function Home() {
  const { dispatch } = useData();

  return (
    <>
      <Head>
        <title>eskate | auction</title>
      </Head>
      <Layout>
        <Auction />
      </Layout>
      <Bid />
    </>
  );
}
