import Head from "next/head";
import Form from "../components/form";
import Layout from "../components/layout";

export default function Add() {
  return (
    <>
      <Head>
        <title>eskate | add auction</title>
      </Head>
      <Layout>
        <Form />
      </Layout>
    </>
  );
}
