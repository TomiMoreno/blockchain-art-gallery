import { useState } from "react";
import useContract from "../hooks/useContract";

export default function SendSketchButton(props: {
	hashedSketch: string;
  title: string;
}) {
	const { hashedSketch, title } = props;
	const [isWaving, setIsWaving] = useState(false);
	const SketchContract = useContract();

  const sendSketch = async () => {
    try {
      setIsWaving(true);
      if (SketchContract) {
        const sketchTxn = await SketchContract.sendSketch(hashedSketch, title);
        console.log("Mining...", sketchTxn.hash);

        await sketchTxn.wait();
        console.log("Mined -- ", sketchTxn.hash);
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
		<button className="waveButton" onClick={sendSketch}>
			{isWaving ? "Sending..." : "Send your sketch!"}
		</button>
	);
}