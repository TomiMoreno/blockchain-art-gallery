import { NextPage } from "next";
import Link from "next/link";
import Sketch from "../components/Sketch";
import { useContext } from "react";
import { SketchContractContext } from "../store/SketchContractContext";

const Gallery:NextPage = () => {
  const {
		sketches
  } = useContext(SketchContractContext);

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
        {sketches.map(({ sketch, title }, i) => (
          <Sketch hashedGrid={sketch} title={title} key={i} />
        ))}
      </div>
    </div>
  );
}

export default Gallery;
