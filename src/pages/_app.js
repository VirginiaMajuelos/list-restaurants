import { Layout } from "../components/Layout";
import Head from "next/head";
import "semantic-ui-css/semantic.min.css";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Restaurants</title>
        <link rel="icon" href="../../public/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
