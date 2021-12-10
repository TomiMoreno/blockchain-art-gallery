import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "../utils/SketchPortal.json";
import SketchCreator from "../components/SketchCreator";

declare global {
  interface Window {
    ethereum: any;
  }
}

const Home: NextPage = () => {
  <Head>
    <title>Home</title>
    <link rel="icon" href="/favicon.ico" />
  </Head>;
  const [currentAccount, setCurrentAccount] = useState("");
  const [numberOfWaves, setNumberOfWaves] = useState(0);
  const [isWaving, setIsWaving] = useState(false);
  const contractAddress = "0xCEF1eFA7F3ac7033F1E6834aB8809163aF49EFbA";
  const contractABI = abi.abi;
  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const wavePortalContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      const count = await wavePortalContract.getTotalWaves();
      console.log(count);
      setNumberOfWaves(count.toNumber());

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">🧉 Hey!</div>

        <div className="bio">
          I&apos;m Tomás, a full stack developer from Argentina🇦🇷 focused on
          creating great products, and currently learning about web3 and
          blockchain development 🔗
        </div>

        {!currentAccount && (
          <button className="connectWalletButton" onClick={connectWallet}>
            Connect Wallet 💰
          </button>
        )}
        {currentAccount && (
          <>
            <p>
              Draw something cool and send it to the blockchain, your sketch will be
              saved in the gallery and everyone will be able to see it! Use your
              power wisely 🧑‍🎨
            </p>
            {numberOfWaves > 0 ? (
              <p>{numberOfWaves} people have sent their sketches</p>
            ) : (
              <p>No one has sent any sketches, you can be the first one 👀</p>
            )}
            <SketchCreator />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
