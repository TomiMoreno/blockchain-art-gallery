import { useState } from "react";
import SendSketchButton from "./SendSketchButton";
import rgba2hex from "../utils/RgbaToHex";

const SIZE = 16;
const DEFAULT_GRID_COLOR = "#d9d9d9";

const generateGrid = () => {
  const grid:string[][]  = [];
  for (let i = 0; i < SIZE; i++) {
    grid[i] = [];
    for (let j = 0; j < SIZE; j++) {
      grid[i][j] = DEFAULT_GRID_COLOR;
    }
  }
  return grid;
};

const formatGrid = (grid:string[][]) =>
  grid.flat().reduce((prev, curr) => {
    return prev + curr;
  }, "");

export default function SketchCreator() {
  const [grid, setGrid] = useState(generateGrid());
  const [actualColor, setActualColor] = useState("#aaffff");
  const [title, setTitle] = useState("");

  const handlePaintCell = (i:number, j:number) => {
    const copyOfGrid = JSON.parse(JSON.stringify(grid));
    copyOfGrid[i][j] = actualColor;
    setGrid(copyOfGrid);
  };

  return (
    <div className="sketchContainer">
      <div>
        <label htmlFor="pickColor">Pick your color{" "}</label>
        <input
          type="color"
          onChange={(e) => {
            const { value } = e.target;
            if(value.startsWith('rgba')){
              console.log(rgba2hex(value).slice(0,-2))
              setActualColor('#' + rgba2hex(value).slice(0,-2));
              return;
            }
            setActualColor(value);
          }}
          id="pickColor"
        />
      </div>
      <input
        type="text"
        className="input"
        placeholder="Enter your title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
      />
      <table>
        <tbody>
          {grid.map((row, i) => (
            <tr key={i} draggable={false}>
              {row.map((color, j) => (
                <td
                  key={j}
                  draggable={false}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePaintCell(i, j);
                  }}
                  onMouseDown={() => handlePaintCell(i, j)}
                  onMouseEnter={(e) => {
                    if (e.buttons > 0) {
                      handlePaintCell(i, j);
                    }
                  }}
                  style={{ background: color }}
                ></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <SendSketchButton hashedSketch={formatGrid(grid)} />
    </div>
  );
}
