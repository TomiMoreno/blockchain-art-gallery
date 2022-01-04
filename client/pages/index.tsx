import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import SketchCreator from "../components/SketchCreator";
import { useContext } from "react";
import { SketchContractContext } from "../store/SketchContractContext";

declare global {
  interface Window {
    ethereum: any;
  }
}

const Home: NextPage = () => {
  <Head>
    <title>Home</title>
    <link rel="icon" href="/favicon.ico" />
    <link rel="shortcut icon" href="/android-chrome-192x192.png" />
  </Head>
  const {
    connectWallet,
    changeNetwork,
    currentAccount,
    currentNetwork,
    sketches
  } = useContext(SketchContractContext);
  const numberOfSketches = sketches.length;

  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">🧉 Hey!</div>

        <div className="bio">
          I&apos;m Tomás, a full stack developer from Argentina🇦🇷 focused on
          creating great products, and currently learning about web3 and
          blockchain development 🔗
        </div>

        {!currentAccount && currentNetwork === "rinkeby" && (
          <button className="connectWalletButton" onClick={connectWallet}>
            Connect Wallet 💰
          </button>
        ) }
        
        { currentNetwork !== "rinkeby" && (
          <>
            <div>
              You are currently connected to {currentNetwork} network. To use
              the app you need to connect to the rinkeby network.
            </div>
            <button className="changeNetworkButton" onClick={changeNetwork}>
              Change Network 🔗
            </button>
          </>
        )}
        {currentAccount && currentNetwork === "rinkeby" && (
          <>
            <p>
              Draw something cool and send it to the blockchain, your sketch
              will be saved in the{" "}
              <Link href="/gallery">
                <a>gallery</a>
              </Link>{" "}
              and everyone will be able to see it! Use your power wisely 🧑‍🎨
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
