import { ethers } from "ethers";
import { useEffect, useState } from "react";
import abi from "../utils/SketchPortal.json";

const contractAddress = "0xF761689AbED0293e062638c8790F96928c5C33C3";
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