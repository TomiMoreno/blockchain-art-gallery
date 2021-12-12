import { useState } from "react";
import { useSendSketch } from "../hooks/useSendSketch";

export default function SendSketchButton(props: {
	hashedSketch: string;
  title: string;
}) {
	const { hashedSketch, title } = props;
  const {sendSketch, isLoading} = useSendSketch()

	
	return (
		<button className="waveButton" onClick={()=>sendSketch(hashedSketch, title)}>
			{isLoading ? "Sending..." : "Send your sketch!"}
		</button>
	);
}