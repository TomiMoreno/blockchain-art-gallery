const SIZE = 16;

const createGridFromHashedGrid = (hashedGrid:string) => {
  const grid:string[][] = [];
  const dividedInput = hashedGrid.split('#').slice(1)
  dividedInput.forEach((color, i) => {
    if(i % SIZE === 0) {
      grid.push([]);
    }
    grid[grid.length - 1].push('#'+color);
  });
  return grid;
}

interface Props {
  hashedGrid: string;
  title: string;
}
export default function Sketch({hashedGrid, title}: Props) {
  const grid = createGridFromHashedGrid(hashedGrid)
  return (
    <div className="sketchContainer">
      <h2>{title}</h2>
      <table>
        <tbody>
          {grid.map((row, i) => (
            <tr key={`row-${i}`} draggable={false}>
              {row.map((color, j) => (
                <td
                  key={`cell-${i}-${j}`}
                  draggable={false}
                  style={{ background: color }}
                ></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
