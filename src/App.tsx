import { ColorDivs } from "./components/colorDiv";
import { useState } from "react";
import { ColorGenerator } from "./components/colorGenerator";
import "./App.css";


function App() {
  const [currentColors, setColors] = useState<string[]>([]);
  return (
    <>
      <ColorDivs colors={currentColors} />
      <ColorGenerator colors={currentColors} setColors={setColors} />
    </>
  );
}
export default App;
