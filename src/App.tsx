import { useEffect, useState } from "react";
import "./App.css";

interface colorProps {
  colors: string[];
}

function ColorDivs({ colors }: colorProps) {
  const [_copy, setCopy] = useState<string>("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  async function handleCopy(index: number) {
    const colorToCopy = colors[index];
    setCopy(colorToCopy);

    await navigator.clipboard.writeText(colorToCopy);

    // Show "copied" feedback
    setCopiedIndex(index);

    // Reset after 2 seconds
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000);
  }

  return (
    <div className="container">
      {colors.map((color, index) => {
        return (
          <div
            key={index}
            className={`color-${index + 1} color`}
            style={{ backgroundColor: colors[index] }}
            onClick={() => handleCopy(index)}
          >
            {copiedIndex === index ? (
              <p className="copied">Copied to clipbooard!</p>
            ) : (
              color
            )}
          </div>
        );
      })}
    </div>
  );
}

function App() {
  const [currentColors, setColors] = useState<string[]>([]);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  function handleGenerate() {
    const letters = "0123456789ABCDEF";
    const colors = [];
    for (let i = 0; i < 4; i++) {
      let color = "#";
      for (let j = 0; j < 6; j++) {
        color += letters[Math.floor(Math.random() * letters.length)];
      }
      colors.push(color);
    }
    setColors(colors);
  }
  useEffect(() => {
    handleGenerate();
  }, []);

  async function handleCopy() {
    const colorString = currentColors.join(" ");
    await navigator.clipboard.writeText(colorString);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  }

  function applyPastel(hexColor: string, blendAmount = 0.15): string {
    const hex = hexColor.replace("#", "");

    // Convert to RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Blend with white
    const newR = Math.round(r + (255 - r) * blendAmount);
    const newG = Math.round(g + (255 - g) * blendAmount);
    const newB = Math.round(b + (255 - b) * blendAmount);
    // Convert back to hex
    return `#${newR.toString(16).padStart(2, "0")}${newG
      .toString(16)
      .padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`;
  }
  function turnPastel(colors: string[], decrement = false) {
    const pastelColors = [];
    for (const color of colors) {
      let newPastel = applyPastel(color);
      if (decrement === true) {
        newPastel = applyPastel(color, -0.15);
      }
      pastelColors.push(newPastel);
    }
    setColors(pastelColors);
  }

  return (
    <>
      <ColorDivs colors={currentColors} />
      <div className="btn-container">
        <button
          className="generate-btn"
          style={{ backgroundColor: currentColors[0] }}
          onClick={() => handleGenerate()}
        >
          Generate
        </button>
        <button
          className="copy-btn"
          style={{ backgroundColor: currentColors[0] }}
          onClick={() => handleCopy()}
        >
          {isCopied ? "Copied palette ✅" : "Copy"}
        </button>
        <button
          className="incr-pastel"
          onClick={() => turnPastel(currentColors)}
        >
          + <span className="tooltip">increment pastel level</span>
        </button>
        <button
          className="decr-pastel"
          onClick={() => turnPastel(currentColors, true)}
        >
          - <span className="tooltip">decrement pastel level</span>
        </button>
      </div>
    </>
  );
}

export default App;
