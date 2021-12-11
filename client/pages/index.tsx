import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import SketchCreator from "../components/SketchCreator";
import useContract from "../hooks/useContract";

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
  const [numberOfSketches, setNumberOfSketches] = useState(0);
  const sketchContract = useContract()
  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;
    if (!ethereum || !sketchContract) {
      console.log("Make sure you have metamask!");
      return;
    } 
    try {
      const count = await sketchContract.getTotalWaves();
      sketchContract.on("NewSketch", (...data) => {
        console.log(data);
        setNumberOfSketches(count.toNumber());
      })
      console.log(count);
      setNumberOfSketches(count.toNumber());

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
              Draw something cool and send it to the blockchain,
              your sketch will be saved in the {" "}
              <Link href="/gallery">
                <a>
                  gallery
                </a>
              </Link> 
              {" "} and everyone will be able to see it! 
              Use your power wisely 🧑‍🎨
            </p>
            {numberOfSketches > 0 ? (
              <p>{numberOfSketches} people have sent their sketches</p>
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
