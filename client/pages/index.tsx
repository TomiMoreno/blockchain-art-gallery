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
  </Head>;
  const {
    connectWallet,
    currentAccount,
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
