import { useState } from "react";
import "./App.css";

function ColorDivs({colors}) {
  return (
    <div className="container">
      {colors.map((color, index) => {
        return (
          <div
            key={index}
            className={`color-${index + 1} color`}
            style={{ backgroundColor: colors[index]}}
          >
            {color}
          </div>
        );
      })}
    </div>
  );
}

function handleCopy() {
  console.log("copying colors......");
}

function App() {
  const colors = ["#7B4019", "#FF7D29", "#FFBF78", "#FFEEA9"];
  const [currentColors, setColors] = useState(colors);

  function handleGenerate() {
    let letters = "0123456789ABCDEF";
    const colors = [];
    for (let i = 0; i < 4; i++) {
      let color = "#";
      for (let j = 0; j < 6; j++) {
        color += letters[Math.floor(Math.random() * letters.length)];
      }
      colors.push(color);
    }
    console.log(colors);
    setColors(colors);
  }
  return (
    <>
      <ColorDivs colors={currentColors}/>
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
