import { useState } from "react";
import SendSketchButton from "./SendSketchButton";

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

  const handlePaintCell = (i:number, j:number) => {
    const copyOfGrid = JSON.parse(JSON.stringify(grid));
    copyOfGrid[i][j] = actualColor;
    setGrid(copyOfGrid);
  };

  return (
    <div className="sketchContainer">
      <input
        type="color"
        onChange={(e) => {
          setActualColor(e.target.value);
        }}
        value={actualColor}
      />
      <table>
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
      </table>
      <SendSketchButton hashedSketch={formatGrid(grid)} />
    </div>
  );
}
