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


export default function Sketch({hashedGrid}: {hashedGrid:string}) {
  const grid = createGridFromHashedGrid(hashedGrid)
  return (
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
  );
}
