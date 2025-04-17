import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import "./App.scss";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";

//1. 앱이 실행되자마자 현재위치 기반의 날씨 보임.
//2. 내가 지금 현재 있는 도시, 섭씨온도, 화씨온도 날씨 상태.
//3. 5개의 버튼이 있다. (현재위치, 4개의 다른 도시)
//4. 도시 버튼을 클릭할 때마다 도시별 날씨가 나온다.
//5. 현재위치 버튼 누르면 다시 현재위치
//6. 데이터 들고오는 동안 로딩스피너.
function App() {
  let [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const cities = ["paris", "new york", "tokyo"];

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c4bc2b8950eb7b1cc32133b33f31b45b&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setLoading(true);
    setWeather(data);
    setLoading(false);
  };

  useEffect(() => {
    if (city === "") {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);

  //ui가 처음에 그려졌을 때 배열에 값이 있다면 바뀔때마다 호출

  const getWeatherByCity = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c4bc2b8950eb7b1cc32133b33f31b45b&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    console.log("data", data);
    setWeather(data);
    setLoading(false);
  };

  const handleCityChange = (city) => {
    if (city === "current") {
      setCity("");
    } else {
      setCity(city);
    }
  };

  return (
    <div className="App">
      <div className="weather-container">
        {loading ? (
          <div className="center">
            <ClipLoader
              loading={loading}
              size={100}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          <div>
            <WeatherBox weather={weather}></WeatherBox>
            <WeatherButton
              cities={cities}
              setCity={setCity}
              handleCityChange={handleCityChange}
            ></WeatherButton>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
