// Pixel rows are drawn on a 24 × 32 grid with a limited, flat palette.
const palette: Record<string, string> = {
  O: "#193440", Y: "#d5b34a", H: "#f1d572", S: "#edc599",
  K: "#193440", T: "#ce9d72", C: "#326678", L: "#5793a0",
  D: "#2a3e52", A: "#42677b", W: "#dbe6df",
};
type PixelRow = readonly [number, string];
const upperBody: PixelRow[] = [
  [0, ""], [9, "OOOOOO"], [8, "OYYYYYYO"], [7, "OYYYYYYYYO"],
  [7, "OYHYYYYYYO"], [7, "OYYOOOOOOO"], [7, "OYOSSSSSSO"],
  [7, "OOSSSSSKSO"], [8, "OSSSSSKSSO"], [8, "OSSSSSSSSSO"],
  [8, "OSSSSSSSSO"], [9, "OSSTSSSO"], [10, "OSSSOO"], [10, "OSSO"],
  [7, "OOCCCCOO"], [6, "OCCCCCCCCO"], [6, "OCLCCCCCCO"],
  [6, "OCLCCCCCCO"], [6, "OCLCCCCCCO"], [7, "OCCCCCCO"],
  [7, "OCCCCCCO"], [7, "OOOOOOOO"],
];
const strides: PixelRow[][] = [
  [[7,"ODDDDODO"],[7,"ODDDDODDO"],[6,"ODDDDOODDDO"],[5,"ODDDDO..ODDDO"],[4,"ODDDDO....ODDDO"],[4,"OAAAO.....OAAAO"],[3,"OAAAAO.....OAAAAAO"],[3,"OWWWWO.....OWWWWWO"],[3,"OOOOOO.....OOOOOOO"]],
  [[8,"ODDDODDDO"],[8,"ODDDODDDO"],[8,"ODDDODDDO"],[8,"ODDDODDDO"],[8,"ODDDODDDO"],[7,"OAAAODDDO"],[7,"OWWWOAAAAO"],[7,"OOOOOWWWWO"],[12,"OOOOOO"]],
  [[7,"ODDDDDDO"],[7,"ODDDDDDO"],[8,"ODDDDDDO"],[8,"ODDDO.DDO"],[9,"ODDDO.DDO"],[9,"OAAAO.OAAAO"],[9,"OWWWO..OAAAAAO"],[9,"OOOOO..OWWWWWO"],[16,"OOOOOOO"]],
  [[7,"ODDDDDDO"],[6,"ODDDODDDO"],[5,"ODDDO.ODDO"],[5,"ODDDO..ODDO"],[6,"OAAAO..ODDO"],[6,"OWWWO..ODDO"],[6,"OOOOO.OAAAAO"],[12,"OWWWWWO"],[12,"OOOOOOO"]],
  [[7,"ODDDDDDO"],[7,"ODDDDDDDDO"],[8,"OOOO.DDDDO"],[12,"OAAAO"],[12,"OWWWO"],[12,"OOOOO"],[0,""],[0,""],[0,""]],
];
const armPaths = [
  { edge: "M8 15h4v4H9v4H5v-5h3Z", sleeve: "M9 16h2v2H9Z", hand: "M6 19h3v3H6Z" },
  { edge: "M8 15h4v9H7v-4h1Z", sleeve: "M9 16h2v4H9Z", hand: "M8 20h3v3H8Z" },
  { edge: "M8 15h4v3h3v5h-5v-3H8Z", sleeve: "M9 16h2v3H9Z", hand: "M11 20h3v2h-3Z" },
  { edge: "M8 15h4v8H7v-4h1Z", sleeve: "M9 16h2v3H9Z", hand: "M8 19h3v3H8Z" },
  { edge: "M9 15h4v-3h5v4h-4v4H9Z", sleeve: "M10 16h3v3h-3Z", hand: "M14 13h3v2h-3Z" },
];
function pixels(rows: PixelRow[], top = 0) {
  return rows.flatMap(([left, row], y) => {
    const runs = [];
    for (let x = 0; x < row.length;) {
      const color = row[x];
      let end = x + 1;
      while (row[end] === color) end++;
      if (palette[color]) runs.push(<rect key={y + "-" + x} x={left + x} y={top + y} width={end - x} height={1} fill={palette[color]} />);
      x = end;
    }
    return runs;
  });
}

/** Shared original artwork; movement belongs to the scene that renders it. */
export function PixelRunner() {
  return <svg viewBox="0 0 24 32" width="72" height="96" shapeRendering="crispEdges" className="pixel-runner">
        {strides.map((rows, pose) => <g key={pose} className="runner-pose" data-pose={pose}>{pixels(rows, 22)}</g>)}
        {pixels(upperBody)}
        {armPaths.map((arm, pose) => <g key={pose} className="runner-pose" data-pose={pose}>
          <path d={arm.edge} fill={palette.O} />
          <path d={arm.sleeve} fill={palette.C} />
          <path d={arm.hand} fill={palette.S} />
        </g>)}
      </svg>;
}
