import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import Sketch from "../components/Sketch";
import useContract from "../hooks/useContract";

interface ISketch {
	sketch: string;
	sketcher: string;
	timestamp: string;
}

const Gallery:NextPage = () => {
	const SketchContract = useContract();
	const [sketches, setSketches] = useState<ISketch[]>([]);

	useEffect(()=>{
		const getSketches = async () => {
			if(!SketchContract){
				return;
			}
			const sketches = await SketchContract.getAllSketches();
			setSketches(sketches);
		}
		getSketches();
	},[SketchContract])

	return (
    <div>
      <h1>Gallery 🎨</h1>
      <div>Welcome to the gallery, check out all the sketches and enjoy.</div>
      <div>
        You can create your own one at{" "}
        <Link href="/">
          <a>Home Page</a>
        </Link>{" "}
      </div>
      <div className="grid">
        {sketches.map(({ sketch }, i) => (
          <Sketch hashedGrid={sketch} key={i} />
        ))}
      </div>
    </div>
  );
}

export default Gallery;
