import { useMoralis } from "react-moralis";
import React, { useEffect } from "react";

export default function Header() {
  const { enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3 } = useMoralis(); //useMoralis is a hook. Hooks let us hook into react state and lifecycle feature

  useEffect(() => {
    if (isWeb3Enabled) return;
    if (typeof window !== "undefined") {
      if (window.localStorage.getItem("connected")) {
        enableWeb3();
      }
    }
  }, []);

  useEffect(() => {
    Moralis.onAccountChanged((account) => {
      console.log("account changed", account);
      if (account == null) {
        window.localStorage.removeItem("connected");
        deactivateWeb3();
        console.log("Null account found")
      }
    });
  }, []);

  return (
    <div>
      {account ? (
        <div>
          Connected to {account.slice(0, 6)}...{account.slice(account.length - 4)}
        </div>
      ) : (
        <button
          onClick={async () => {
            await enableWeb3();
            if (typeof window !== "undefined") {
              window.localStorage.setItem("connected", "injected");
            }
          }}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}
