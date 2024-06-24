/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./style.css";

const WeatherCard = ({ weatherInfo }) => {
  const {
    humidity,
    pressure,
    temperature,
    name,
    country,
    sunset,
    weatherMood,
    speed,
  } = weatherInfo || {};

  const date = new Date(sunset * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const [dateTime, setDateTime] = useState({
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime({
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      });
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <>
      <div className="main-container">
        <div className="weather-mood-logo">{weatherMood}</div>
        <div className="temperature">
          <div className="temperature-detail">
            <div className="temp">{temperature}&nbsp;&deg;C</div>
            <div className="country">{country}</div>
            <div className="country-state">{name}</div>
          </div>
          <div className="date-time">
            <div className="date">{dateTime.date}</div>
            <div className="time">{dateTime.time}</div>
          </div>
        </div>
        <div className="extra-details">
          <div className="sunset">
            <span>Sunset</span>
            {`${hours}:${minutes < 10 ? "0" : ""}${minutes} PM`}
          </div>
          <div className="humidity">
            <span>Humidity</span> {humidity}
          </div>
          <div className="pressure">
            <span>Pressure</span> {pressure}
          </div>
          <div className="wind-speed">
            <span>Wind Speed</span> {speed} km/hr
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherCard;
