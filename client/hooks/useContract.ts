import { ethers } from "ethers";
import { useEffect, useState } from "react";
import abi from "../utils/SketchPortal.json";

const contractAddress = "0xCEF1eFA7F3ac7033F1E6834aB8809163aF49EFbA";
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