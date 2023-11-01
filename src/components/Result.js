import Error from "./Error";
import Loading from "./Loading";
import WeatherCard from "./WeatherCard";
import Welcome from "./Welcome";

function Result({ isLoading, error, weatherData, city }) {
  const noData = !weatherData.length;

  return (
    <>
      {!isLoading && !error && noData && <Welcome />}
      {isLoading && <Loading />}
      {error && <Error error={error} />}
      {!isLoading && !error && !noData && (
        <>
          <h2>{city}</h2>
          <ul>
            {weatherData.map((weather) => (
              <WeatherCard weather={weather} key={weather.day} />
            ))}
          </ul>
        </>
      )}
    </>
  );
}

export default Result;
