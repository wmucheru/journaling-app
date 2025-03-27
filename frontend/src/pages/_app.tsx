import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";

import { store } from "@/redux/store";

import "@/styles/components.css";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </CookiesProvider>
  );
}
