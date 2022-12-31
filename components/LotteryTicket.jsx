import { useState, useEffect } from "react";
import { useWeb3Contract } from "react-moralis";
import { useMoralis } from "react-moralis";
import { ethers } from "ethers";

export default function LotteryTicket() {
  const [entranceFee, setEntranceFee] = useState("");

  const CONTRACT_ADDRESS_FOREACH_CHAIN = { 5: "0x96cFfb77D940bFCA38dD35E210BEFfE6556d71dC" };
  // Imagine that we have deployed the contract on many chains, we can use an object like this.
  // The keys are the chain IDs and the values are the contract addresses. There is a better practice with creating an object outside of this code, and by updating it when we deploy the contract but I will not do this in this project.

  const ABI = require("../contract/abi/Lottery_ABI.json").output.abi;

  // the reason Moralis knows about what chain we're on is because back in our header component, the header actually passes up all the information about the Metamask to the Moralis provider. And then the Moralis provider passes it down to all the components inside the Moralis provided tags in the _app.js
  const { chainId: chaindIdHex, isWeb3Enabled } = useMoralis();
  // This line of code is using object destructuring to assign the value of chainId to a new variable called chaindIdHex
  const chainID = parseInt(chaindIdHex);
  const RAFFLE_ADDRESS = chainID in CONTRACT_ADDRESS_FOREACH_CHAIN ? CONTRACT_ADDRESS_FOREACH_CHAIN[chainID] : null;
  const { runContractFunction: enterRaffle } = useWeb3Contract({
    abi: ABI,
    contractAddress: RAFFLE_ADDRESS,
    functionName: "enterRaffle",
    msgValue: entranceFee,
    params: {},
  });

  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi: ABI,
    contractAddress: RAFFLE_ADDRESS,
    functionName: "getEntranceFee",
    params: {},
  });

  useEffect(() => {
    if (isWeb3Enabled) {
      if (RAFFLE_ADDRESS) {
        const updateUI = async () => {
          const entranceFeeFromFunction = (await getEntranceFee()).toString();
          setEntranceFee(entranceFeeFromFunction);
        };
        updateUI();
      }
    }
  }, [isWeb3Enabled, RAFFLE_ADDRESS]);

  return (
    <div>
      <h1>Lottery Ticket</h1>
      {RAFFLE_ADDRESS ? (
        <div>
          {entranceFee !== "" && <p>Entrance Fee : {ethers.utils.formatUnits(entranceFee)} ETH</p>}
          <button
            onClick={async function () {
              await enterRaffle();
            }}
          >
            enter Raffle
          </button>
        </div>
      ) : (
        <p>Contract not deployed on this chain</p>
      )}
    </div>
  );
}
