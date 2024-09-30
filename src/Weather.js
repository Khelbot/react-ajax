import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Weather() {
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [description, setDescription] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [wind, setWind] = useState(null);
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      if (!city) return;

      setLoading(true); // Start loading

      try {
        const apiKey = `8ca7dd4e61360b90fb66918853670e48`; // Use environment variable
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await axios.get(url);

        const roundedTemperature = Math.round(response.data.main.temp);

        setTemperature(roundedTemperature);
        setDescription(response.data.weather[0].description);
        setHumidity(response.data.main.humidity);
        setWind(response.data.wind.speed);
        setIcon(response.data.weather[0].icon);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching data");
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchWeather();
  }, [city]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputCity = e.target.elements.city.value;
    setCity(inputCity);
    e.target.reset(); // Reset form
  };

  if (loading) return <h4>Loading...</h4>;
  if (error) return <h4>{error}</h4>;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" id="city" placeholder="Enter a city..." required />
          <button type="submit">Search</button>
        </div>
      </form>

      <ul>
        {temperature !== null && <li>Temperature: {temperature} °C</li>}
        {description && <li>Description: {description}</li>}
        {humidity !== null && <li>Humidity: {humidity}%</li>}
        {wind !== null && <li>Wind Speed: {wind} m/s</li>}
        {icon && (
          <li>
            {" "}
            <img
              src={`http://openweathermap.org/img/wn/${icon}.png`}
              alt={description}
            />
          </li>
        )}
      </ul>
    </div>
  );
}
