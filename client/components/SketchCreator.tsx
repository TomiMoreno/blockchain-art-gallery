import { useState } from "react";
import rgba2hex from "../utils/RgbaToHex";
import { useSendSketch } from "../hooks/useSendSketch";

const SIZE = 16;
const DEFAULT_GRID_COLOR = "#FFF";

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
  const {sendSketch, isLoading} = useSendSketch()
  const [grid, setGrid] = useState(generateGrid());
  const [actualColor, setActualColor] = useState("#aaffff");
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState<null | true>(null)

  const handlePaintCell = (i:number, j:number) => {
    const copyOfGrid = JSON.parse(JSON.stringify(grid));
    copyOfGrid[i][j] = actualColor;
    setGrid(copyOfGrid);
  };
  const handleSubmit = () => {
    if(!title){
      setTitleError(true);
      return;
    }
    setTitleError(null);
    sendSketch(formatGrid(grid), title);
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if(e.target.value.length === 0){
      setTitleError(true);
    } else {
      setTitleError(null);
    }
  }

  return (
    <div className="sketchContainer">
      <div>
        <label htmlFor="pickColor">Pick your color{" "}</label>
        <input
          type="color"
          onChange={(e) => {
            const { value } = e.target;
            if(value.startsWith('rgba')){
              setActualColor('#' + rgba2hex(value).slice(0,-2));
              return;
            }
            setActualColor(value);
          }}
          id="pickColor"
          value={actualColor}
        />
      </div>
      <div>
        <input
          type="text"
          className={`input ${titleError && 'input-error'}`}
          placeholder="Enter your title"
          value={title}
          onChange={handleInput}
          id="title"
        />
        {
          titleError && 
            <label
              className="input-error"
              htmlFor="title"
            >
              Title is required
            </label>
        }
      </div>
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
      <button className="waveButton" onClick={handleSubmit}>
        {isLoading ? "Sending..." : "Send your sketch!"}
      </button>
    </div>
  );
}
