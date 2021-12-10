import { useState } from "react";
import useContract from "../hooks/useContract";

export default function SendSketchButton(props: {
	hashedSketch: string;
}) {
	const { hashedSketch } = props;
	const [isWaving, setIsWaving] = useState(false);
	const SketchContract = useContract();

  const wave = async () => {
    try {
      setIsWaving(true);
      const { ethereum } = window;

      if (SketchContract) {

        let count = await SketchContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());

        /*
         * Execute the actual wave from your smart contract
         */
        const waveTxn = await SketchContract.sendSketch(hashedSketch);
        console.log("Mining...", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);

        count = await SketchContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());
				const allSketches = await SketchContract.getAllSketches();
				console.log("Retrieved all sketches...", allSketches);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsWaving(false);
    }
  };
	
	return (
		<button className="waveButton" onClick={wave}>
			{isWaving ? "Sending..." : "Send your sketch!"}
		</button>
	);
}