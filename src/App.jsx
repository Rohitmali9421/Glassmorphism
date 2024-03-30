import React, { useState, useEffect } from "react";
function App() {
  const [color, setColor] = useState("rgba(255,255,255,0.1)");
  const [corner, setCorner] = useState("10");
  const [opacity, setOpacity] = useState("0.53");
  const [blur, setBlur] = useState("44");
  const [outline, setOutline] = useState("55");

  const divStyle = {
    height: "400px",
    width: "400px",
    background:` ${color}`,
    backdropFilter: `blur(${blur / 10}px)`,
    borderRadius: `${corner}px`,
    border: `1px solid rgba(255, 255, 255, ${outline/100})`,
  };

  useEffect(() => {
    let x = document.querySelector(".color").value;
    setColor(hexToRgba(x, 0.5));
  }, [opacity]);

  function hexToRgba(hex, alpha) {
    // Remove '#' if present
    hex = hex.replace("#", "");

    // Parse hex values to get red, green, and blue
    var r = parseInt(hex.substring(0, 2), 16);
    var g = parseInt(hex.substring(2, 4), 16);
    var b = parseInt(hex.substring(4, 6), 16);

    // Validate alpha
    if (typeof alpha === "undefined") {
      alpha = 1;
    } else {
      alpha = parseFloat(alpha);
      if (isNaN(alpha) || alpha < 0 || alpha > 1) {
        alpha = 1;
      }
    }

    // Construct RGBA string
    var rgba = `rgba(${r},${g},${b},${opacity})`;

    return rgba;
  }

  const handleColorChange = (e) => {
    console.log(hexToRgba(e.target.value, 0.5));
    setColor(hexToRgba(e.target.value, 0.5));
  };

  const handleBlurChange = (e) => {
    setBlur(e.target.value);
  };

  const handleCornerChange = (e) => {
    setCorner(e.target.value);
  };
  const handleOutlineChange = (e) => {
    setOutline(e.target.value);
  };

  const handleOpacityChange = (e) => {
    setOpacity(e.target.value / 100);
  };

  return (
    <>
      <div className="w-full py-5 gap-5 h-screen flex flex-col-reverse md:flex-row justify-evenly md:bg-[url(./bg.jpg)] items-center bg-cover bg-[url(./bg3.jpg)] bg-center ">
        <div className="w-98 py-4 px-6 bg-white bg-opacity-50  rounded-xl">
          <h1>TRANSPARENCY</h1>
          <input
            type="range"
            min={0}
            max={100}
            value={opacity * 100}
            onChange={handleOpacityChange}
            className="w-full border-0 p-0 appearance-none rounded-md h-[6px] [&::-webkit-slider-thumb]:bg-white"
          />
          <h1>BLUR</h1>
          <input
            type="range"
            min={0}
            max={200}
            value={blur}
            onChange={handleBlurChange}
            className="w-full appearance-none rounded-md h-[6px] [&::-webkit-slider-thumb]:bg-white"
          />
          <h1>OUTLINE</h1>
          <input
            type="range"
            min={0}
            max={100}
            value={outline}
            onChange={handleOutlineChange}
            className="w-full appearance-none rounded-md h-[6px] [&::-webkit-slider-thumb]:bg-white"
          />
          <h1>CORNER</h1>
          <input
            type="range"
            min={1}
            max={100}
            value={corner}
            onChange={handleCornerChange}
            className="w-full appearance-none rounded-md h-[6px] [&::-webkit-slider-thumb]:bg-white"
          />
          <h1>COLOR</h1>
          <input
          defaultValue={"#FFFFFF"}
            type="color"
            onChange={handleColorChange}
            className="w-full h-[6px] rounded-md color"
          />
          <h1>CSS</h1>
          <p className="text-md">
            <pre>
              background:{color} <br />
              backdrop-filter:blur({blur / 10}px),<br />
              border-radius: {corner}px <br />
              border: 1px solid rgba(255, 255, 255, {outline/100})
              </pre>
          </p>
          <button className="w-full bg-pink-500 text-white rounded-md py-2  font-bold">Copy CSS</button>
        </div>

        <div style={divStyle} className="overflow-hidden "></div>
      </div>
    </>
  );
}

export default App;
