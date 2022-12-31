import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import { More, NotificationProvider } from "web3uikit";

export default function App({ Component, pageProps }) {
  return (
    <>
      <MoralisProvider initializeOnMount={false}>
        <NotificationProvider>
          <Component {...pageProps} />
        </NotificationProvider>
      </MoralisProvider>
    </>
  );
}
