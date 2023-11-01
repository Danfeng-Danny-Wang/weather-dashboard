function WeatherCard({ weather }) {
  return (
    <li>
      <h3>{weather.day}</h3>
      <p>Weather: {weather.weather}</p>
      <p>Temp: {weather.temp} F</p>
      <p>Wind speed: {weather.windSpeed} MPH</p>
      <p>Humudity: {weather.humudity}%</p>
    </li>
  );
}

export default WeatherCard;
