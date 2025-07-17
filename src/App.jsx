import { useState } from "react";
import "./App.css";

function ColorDivs({ colors }) {
    const [copy, setCopy] = useState("");
    const [copiedIndex, setCopiedIndex] = useState(null);

    async function handleCopy(index) {
        const colorToCopy = colors[index];
        setCopy(colorToCopy);

        await navigator.clipboard.writeText(colorToCopy);
        console.log("copying color", colorToCopy);

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
                        {copiedIndex === index ? <p className="copied">Copied to clipbooard!</p> : color}
                    </div>
                );
            })}
        </div>
    );
}

function App() {
    const colors = ["#7B4019", "#FF7D29", "#FFBF78", "#FFEEA9"];
    const [currentColors, setColors] = useState(colors);
    const [copiedColors, setCopiedColors] = useState([]);

    function handleCopy() { console.log("copying color palette") }

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
        console.log("generated colors: ", colors);
        setColors(colors);
    }
    return (
        <>
            <ColorDivs colors={currentColors} />
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
