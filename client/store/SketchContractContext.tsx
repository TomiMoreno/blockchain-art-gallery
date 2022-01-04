import { createContext, useState, useEffect, useCallback } from "react";
import { ethers, providers } from "ethers";
import abi from "../utils/SketchPortal.json";

interface ISketch {
  sketch: string;
  sketcher: string;
  timestamp: string;
  title: string;
}
interface ISketchContractContext {
  contract: ethers.Contract | null;
  currentAccount: string | null;
  sketches: ISketch[];
  currentNetwork: string | null;
  connectWallet: () => void;
  changeNetwork: () => void;
}

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const contractABI = abi.abi;

const SketchContractContext = createContext<ISketchContractContext>({
  contract: null,
  currentAccount: null,
  sketches: [],
  currentNetwork: null,
  changeNetwork: () => {},
  connectWallet: () => {},
});

const SketchContractProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [contract, setContract] = useState<null | ethers.Contract>(null);
  const [currentAccount, setCurrentAccount] = useState<null | string>(null);
  const [sketches, setSketches] = useState<any[]>([]);
  const [currentNetwork, setCurrentNetwork] = useState<string | null>(null);

  const connectWallet = useCallback(async () => {
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
  }, []);

  const changeNetwork = useCallback(async () => {
    if(window.ethereum) {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x4" }], // chainId must be in hexadecimal numbers
      });  
    }
  }, []);


  useEffect(() => {
    const { ethereum } = window;
    if (ethereum && contractAddress) {
      const provider = new ethers.providers.Web3Provider(ethereum, "any");
      provider.on("network", async (newNetwork, oldNetwork) => {
        if (oldNetwork) {
          window.location.reload();
        }
        setCurrentNetwork(newNetwork.name);
      });
      const signer = provider.getSigner();
      const sketchContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      setContract(sketchContract);
      const checkIfWalletConnected = async () => {
        const accounts = await ethereum.request({ method: "eth_accounts" });
        if (accounts.length !== 0) {
          const account = accounts[0];
          setCurrentAccount(account);
        }
      };
      checkIfWalletConnected();
    }
  }, []);

  useEffect(() => {
    const getSketches = async () => {
      if (!contract) {
        return;
      }
      contract.on("NewSketch", (a, b, c, d) => {
        console.log({ a, b, c, d });
      });
      try {
      const sketches = await contract.getAllSketches();
      setSketches(sketches);
      } catch (error) {
        console.log(error);
      }
    };
    getSketches();
  }, [contract]);

  const value = {
    contract,
    currentAccount,
    sketches,
    currentNetwork,
    connectWallet,
    setSketches,
    changeNetwork
  };
  return (
    <SketchContractContext.Provider value={value}>
      {children}
    </SketchContractContext.Provider>
  );
};

export { SketchContractContext, SketchContractProvider };

/* 
*/
