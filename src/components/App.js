import { useState } from "react";
import Header from "./Header";
import Histories from "./Histories";
import Main from "./Main";
import Result from "./Result";
import Search from "./Search";
import SearchBar from "./SearchBar";
import { calculateFiveDayData } from "../helpers/calculateFiveDayData";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const KEY = "dc3f53838236fe4041554494403ffdc4";

function App() {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [currentCity, setCurrentCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [weatherData, setWeatherData] = useState([]);

  const [searchHistory, setSearchHistory] = useLocalStorageState(
    [],
    "searchedCities"
  );

  function handleSearchWeather(city, state) {
    if (city === "") return;

    async function fetchWeatherData() {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city},${state},us&appid=${KEY}&units=imperial`
        );

        if (!res.ok)
          throw new Error("Something went wrong with fetching the location");

        const data = await res.json();
        const weatherData = await data.list.map((timestamp) => {
          return {
            day: timestamp.dt_txt.split(" ")[0],
            temp: timestamp.main.temp,
            humidity: timestamp.main.humidity,
            weather: timestamp.weather[0].main,
            windSpeed: timestamp.wind.speed,
          };
        });
        const fiveDayAverageData = await calculateFiveDayData(weatherData);
        setWeatherData(fiveDayAverageData);
        setCurrentCity(city);
        if (!searchHistory.includes(city))
          setSearchHistory((searchHistory) => [...searchHistory, city]);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchWeatherData();
  }

  return (
    <>
      <Header />

      <SearchBar>
        <Search
          city={city}
          state={state}
          setCity={setCity}
          setState={setState}
          onSearch={handleSearchWeather}
        />
        <Histories
          searchHistory={searchHistory}
          onSearch={handleSearchWeather}
          setCity={setCity}
          setState={setState}
        />
      </SearchBar>

      <Main>
        <Result
          isLoading={isLoading}
          error={error}
          weatherData={weatherData}
          currentCity={currentCity}
        />
      </Main>
    </>
  );
}

export default App;
