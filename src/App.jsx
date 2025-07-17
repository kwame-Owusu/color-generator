import { useState } from "react";
import "./App.css";

function ColorDivs() {
  return (
    <div className="container">
      <div className="color-1 color">1</div>
      <div className="color-2 color">2</div>
      <div className="color-3 color">3</div>
      <div className="color-4 color">4</div>
    </div>
  );
}

function generateColor(){
  console.log("generating color......");
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <ColorDivs />
    <button className="generate-btn" onClick={() => generateColor()}>Generate</button>
    </>
  );
}

export default App;
