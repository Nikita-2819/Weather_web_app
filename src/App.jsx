import { useState } from "react";
import WeatherCard from "./components/weather";

const App = () => {
  const [inputCity, setInputCity] = useState("pune");
  const [weatherInfo, setWeatherInfo] = useState(null); // Initialize with null

  const getWeatherInfo = async (city) => {
    if (!city) {
      return alert("Enter City");
    }
    try {
      const apiKey = "68663535037b151bdb87c3860e91ae9a";
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await res.json();

      const { humidity, pressure, temp } = data.main;
      const {
        name,
        sys: { country, sunset },
        weather: [{ main: weatherMood }],
      } = data;
      const { speed } = data.wind;

      const WeatherList = {
        humidity,
        pressure,
        temperature: temp,
        name,
        country,
        sunset,
        weatherMood,
        speed,
      };

      setWeatherInfo(WeatherList);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="search-container">
        <input
          type="search"
          className="search"
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
        />
        <button
          className="search-btn"
          onClick={() => getWeatherInfo(inputCity)}
        >
          Search
        </button>
      </div>
      {weatherInfo && <WeatherCard weatherInfo={weatherInfo} />}
    </>
  );
};

export default App;
