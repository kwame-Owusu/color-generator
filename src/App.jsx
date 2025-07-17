import { useState } from "react";
import "./App.css";

function ColorDivs() {
  const colors = ["#7B4019", "#FF7D29", "#FFBF78", "#FFEEA9"]; // divs
  return (
    <div className="container">
      {colors.map((color, index) => {
        return (
          <div
            key={index}
            className={`color-${index + 1} color`}
            style={{ backgroundColor: color }}
          >
            {color}
          </div>
        );
      })}
    </div>
  );
}

function handleGenerate() {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
}

function handleCopy() {
  console.log("copying colors......");
}

function App() {
  const [currentColor, setColor] = useState([]);

  return (
    <>
      <ColorDivs />
      <button className="generate-btn" onClick={() => handleGenerate()}>
        Generate
      </button>
      <button className="copy-btn" onClick={() => handleCopy()}>
        Copy
      </button>
    </>
  );
}

export default App;
