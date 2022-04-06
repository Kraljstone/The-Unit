import React, { useEffect, useState } from "react";
import "./App.css";
import Button from "./Components/Button";

const App = () => {
  const [displayedColors, setDisplayedColors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const [changeBackground, setChangeBackground] = useState(null);

  useEffect(() => {
    const request = async () => {
      const response = await fetch("http://localhost:3000/data");

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
      <div className='buttons'>
        {displayedColors.map((color) => (
          <Button
            bgColorFn={setChangeBackground}
            key={color.id}
            name={color.name}
            color={color.color}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
