import { useState } from "react";

interface colorProps {
  colors: string[];
}

export function ColorDivs({ colors }: colorProps) {
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
