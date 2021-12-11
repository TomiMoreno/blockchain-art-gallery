export default function rgba2hex(orig: string) {
  var a: number,
    rgb: any[] = orig
      .replace(/\s/g, "")
      .match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i) as any,
    alpha: number | string= ((rgb && rgb[4]) || "").trim(),
    hex = rgb
      ? (rgb[1] | (1 << 8)).toString(16).slice(1) +
        (rgb[2] | (1 << 8)).toString(16).slice(1) +
        (rgb[3] | (1 << 8)).toString(16).slice(1)
      : orig;
  if (alpha !== "") {
    a = alpha as number;
  } else {
    a = 0o1;
  }

  a = Math.round(a * 100) / 100;
  var alpha: number | string = Math.round(a * 255);
  var hexAlpha = (alpha + 0x10000).toString(16).substr(-2).toUpperCase();
  hex = hex + hexAlpha;

  return hex;
}
