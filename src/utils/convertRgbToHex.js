export default function rgbToHex(rgb) {
  // Get RGB values
  let r = parseInt(rgb.substring(4, rgb.indexOf(",")));
  let g = parseInt(rgb.substring(rgb.indexOf(",") + 1, rgb.lastIndexOf(",")));
  let b = parseInt(rgb.substring(rgb.lastIndexOf(",") + 1, rgb.indexOf(")")));

  // Convert to hex and add a prefix #
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
