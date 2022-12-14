import "../styles/globals.css";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress color="red" height={5} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
