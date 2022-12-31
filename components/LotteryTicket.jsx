import { useState, useEffect } from "react";
import { useWeb3Contract } from "react-moralis";
import { useMoralis } from "react-moralis";
import { ethers } from "ethers";
import { useNotification } from "web3uikit";

export default function LotteryTicket() {
  const [entranceFee, setEntranceFee] = useState("");
  const [numberPlayers, setNumberPlayers] = useState();
  const [recentWinner, setRecentWinner] = useState();

  const CONTRACT_ADDRESS_FOREACH_CHAIN = { 5: "0x96cFfb77D940bFCA38dD35E210BEFfE6556d71dC" }; // Imagine that we have deployed the contract on many chains, we can use an object like this. The keys are the chain IDs and the values are the contract addresses. There is a better practice with creating an object outside of this code, and by updating it when we deploy the contract but I will not do this in this project.
  const ABI = require("../contract/abi/Lottery_ABI.json").output.abi;

  // the reason Moralis knows about what chain we're on is because back in our header component, the header actually passes up all the information about the Metamask to the Moralis provider. And then the Moralis provider passes it down to all the components inside the Moralis provided tags in the _app.js
  const { chainId: chaindIdHex, isWeb3Enabled } = useMoralis(); // This line of code is using object destructuring to assign the value of chainId to a new variable called chaindIdHex
  const chainID = parseInt(chaindIdHex);
  const RAFFLE_ADDRESS = chainID in CONTRACT_ADDRESS_FOREACH_CHAIN ? CONTRACT_ADDRESS_FOREACH_CHAIN[chainID] : null;

  const dispatch = useNotification();

  const {
    runContractFunction: enterRaffle,
    isLoading,
    isFetching,
  } = useWeb3Contract({
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

  const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
    abi: ABI,
    contractAddress: RAFFLE_ADDRESS,
    functionName: "getNumberOfPlayers",
    params: {},
  });

  const { runContractFunction: getRecentWinner } = useWeb3Contract({
    abi: ABI,
    contractAddress: RAFFLE_ADDRESS,
    functionName: "getRecentWinner",
    params: {},
  });

  useEffect(() => {
    if (isWeb3Enabled) {
      if (RAFFLE_ADDRESS) {
        updateUI();
      }
    }
  }, [isWeb3Enabled, RAFFLE_ADDRESS]);

  const updateUI = async () => {
    const entranceFeeFromFunction = (await getEntranceFee()).toString();
    setEntranceFee(entranceFeeFromFunction);
    const numPlayersFromFunction = (await getNumberOfPlayers()).toString();
    setNumberPlayers(numPlayersFromFunction);
    const recentWinnerFromFunction = (await getRecentWinner()).toString();
    setRecentWinner(recentWinnerFromFunction);
  };

  const handleSuccess = async (tx) => {
    await tx.wait(1);
    handleNewNotification(tx);
    updateUI();
  };

  const handleNewNotification = () => {
    dispatch({
      type: "info",
      message: "Transaction Complete!",
      title: "Transaction Notification",
      position: "topR",
      icon: "bell",
    });
  };

  return (
    <div className="p-5">
      {RAFFLE_ADDRESS ? (
        <div>
          {entranceFee !== "" && <p>Entrance Fee : {ethers.utils.formatUnits(entranceFee)} ETH</p>}
          {numberPlayers && <p>Number of Players : {numberPlayers}</p>}
          {recentWinner && <p>Recent Winner : {recentWinner}</p>}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
            onClick={async function () {
              await enterRaffle({
                onSuccess: handleSuccess, //onSuccess checks to see a transaction is successfully sent to metamask
                onError: (error) => console.log(error.message),
              });
            }}
            disabled={isFetching || isLoading}
          >
            {isLoading || isFetching ? <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div> : "Enter Raffle"}
          </button>
        </div>
      ) : (
        <p>Contract not deployed on this chain</p>
      )}
    </div>
  );
}
