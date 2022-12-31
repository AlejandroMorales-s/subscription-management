export default function getContrast(subColor) {
  function getBrightness(color) {
    const r = parseInt(color.substring(1, 3), 16);
    const g = parseInt(color.substring(3, 5), 16);
    const b = parseInt(color.substring(5, 7), 16);
    return (r / 255) * 0.2126 + (g / 255) * 0.7152 + (b / 255) * 0.0722;
  }

  const brightness1 = getBrightness(subColor);
  const brightness2 = getBrightness("#000000");

  return (brightness1 + 0.05) / (brightness2 + 0.05);
}
