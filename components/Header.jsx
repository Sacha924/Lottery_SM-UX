import { ConnectButton } from "web3uikit";

export default function Header() {
  return (
    <nav className="p-3 border-b-2 flex flex-row">
            <h1 className="py-3 px-3 font-bold text-2xl"> Decentralized Lottery</h1>
            <div className="ml-auto py-2 px-2">
                <ConnectButton moralisAuth={false}/>
            </div>
        </nav>
  );
}
