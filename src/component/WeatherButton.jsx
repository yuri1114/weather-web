import React from "react";

const WeatherButton = ({ cities, setCity, handleCityChange }) => {
  return (
    <div className="btn-wrap">
      <button onClick={() => handleCityChange("current")}>
        Current Location
      </button>
      {cities.map((item, index) => (
        <button
          key={index}
          onClick={() => {
            setCity(item);
          }}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default WeatherButton;
