import { ethers } from "ethers";
import { useEffect, useState } from "react";
import abi from "../utils/SketchPortal.json";

const contractAddress = "0xff178B8E011Bc553A7f382CC5dddEA689480601A";
const contractABI = abi.abi;

export default function useContract() {
	const [contract, setContract] = useState<null | ethers.Contract>(null);

	useEffect(() => {
		const {ethereum} = window;
		if(window.ethereum){
				const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
				);
			setContract(wavePortalContract);
		}
	}, []);

	return contract;
}