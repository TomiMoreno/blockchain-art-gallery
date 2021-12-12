import { useContext, useState } from "react";
import { SketchContractContext } from "../store/SketchContractContext";

export function useSendSketch() {
	const { contract: SketchContract } = useContext(SketchContractContext);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<unknown | null>(null);


  const sendSketch = async (sketch: string, title: string ) => {
    try {
      setIsLoading(true);
      if (SketchContract) {
        const sketchTxn = await SketchContract.sendSketch(sketch, title);
        console.log("Mining...", sketchTxn.hash);

        await sketchTxn.wait();
        console.log("Mined -- ", sketchTxn.hash);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error: { message: string } | any) {
			console.log("Error: ", error);
			if(error.message) {
				setError(error.message);
			}else {
				setError("Unknown error");
			}
    } finally {
      setIsLoading(false);
    }
  };
	return { sendSketch, isLoading };
}