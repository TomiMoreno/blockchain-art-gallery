import React, { useState, useEffect } from "react";

const SIZE = 16;

const createGridFromHashedGrid = (hashedGrid:string) => {
  const grid:string[][] = [];
  const dividedInput = hashedGrid.split('#')
  dividedInput.forEach((color, i) => {
    if(i % SIZE === 0) {
      grid.push([]);
    }
    grid[grid.length].push(color);
  });
  return grid;
}


export default function PixelArt(hashedGrid:string) {
  const grid = createGridFromHashedGrid(hashedGrid)
  return (
      <table>
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
      </table>
  );
}
