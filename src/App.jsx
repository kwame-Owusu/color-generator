import { useState } from "react";
import "./App.css";

function ColorDivs({ colors }) {
  const [copy, setCopy] = useState("");
  const [copiedIndex, setCopiedIndex] = useState(null);

  async function handleCopy(index) {
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
  const colors = ["#7B4019", "#FF7D29", "#FFBF78", "#FFEEA9"];
  const [currentColors, setColors] = useState(colors);
  const [isCopied, setIsCopied] = useState(false);

  async function handleCopy() {
    const colorString = currentColors.join(" ")
    await navigator.clipboard.writeText(colorString);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000)
  }

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
  return (
    <>
      <ColorDivs colors={currentColors} />
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
    </>
  );
}

export default App;
