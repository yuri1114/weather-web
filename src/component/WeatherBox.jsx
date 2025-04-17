import React from "react";

const WeatherBox = ({ weather }) => {
  return (
    <div className="weather-box">
      <p className="position">{weather ? weather.name : "현위치"}</p>
      <p className="degree">
        {weather?.main.temp}°C /{Math.trunc((weather?.main.temp * 9) / 5 + 32)}
        °F
      </p>
      <p className="weather">{weather?.weather[0].description}</p>
    </div>
  );
};

export default WeatherBox;
