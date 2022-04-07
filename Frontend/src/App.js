import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import Button from "./Components/Button";

const App = () => {
  const [displayedColors, setDisplayedColors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const [changeBackground, setChangeBackground] = useState(null);
  const colorName = useRef();
  const hexColor = useRef();

  useEffect(() => {
    const request = async () => {
      const response = await fetch(
        "https://twitter-clone-b69f5-default-rtdb.europe-west1.firebasedatabase.app/colors.json"
      );

      setIsLoading(false);
      const body = await response.json();
      const colors = [];

      for (const key in body) {
        colors.push({
          id: key,
          name: body[key].name,
          color: body[key].color,
        });
      }

      setDisplayedColors(colors);
    };

    request();
    request().catch((error) => {
      setHttpError(error.message);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newColor = {
      color: hexColor.current.value,
      name: colorName.current.value,
    };

    fetch(
      "https://twitter-clone-b69f5-default-rtdb.europe-west1.firebasedatabase.app/colors.json",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newColor),
      }
    );
    window.location.reload(true);
  };

  if (httpError) {
    return (
      <div>
        <p className='error'>{httpError}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className='loader'>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className='app' style={{ backgroundColor: `${changeBackground}` }}>
      <div className='hexagon'></div>
      <div className='hexagon'></div>
      <div className='hexagon'></div>
      <div className='hexagon'></div>
      <div className='hexagon'></div>
      <div className='hexagon'></div>
      <div className='hexagon'></div>
      <div className='hexagon'></div>
      <div className='hexagon'></div>
      <div className='buttons'>
        <h3>
          Fill the inputs and after that click on the color. Page will
          reset after 4 sec.
        </h3>
        {displayedColors.map((color) => (
          <Button
            bgColorFn={setChangeBackground}
            deleteID={color.id}
            key={color.id}
            name={color.name}
            color={color.color}
          />
        ))}
        <form onSubmit={handleSubmit}>
          <input type='text' ref={colorName} placeholder='Color' />
          <input type='text' ref={hexColor} placeholder='Hex value' />
          <button>Submit color</button>
        </form>
      </div>
    </div>
  );
};

export default App;
