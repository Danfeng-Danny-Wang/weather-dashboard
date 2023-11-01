import { useState } from "react";
import Header from "./Header";
import Histories from "./Histories";
import Main from "./Main";
import Result from "./Result";
import Search from "./Search";
import SearchBar from "./SearchBar";
import { calculateFiveDayData } from "../helpers/calculateFiveDayData";

const KEY = "dc3f53838236fe4041554494403ffdc4";

function App() {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearchWeather() {
    console.log(city, state);

    try {
      setIsLoading(true);
      setError("");

      const res = await fetch(
        `http://api.openweathermap.org/data/2.5/forecast?q=${city},${state},us&appid=${KEY}&units=imperial`
      );

      if (!res.ok)
        throw new Error("Something went wrong with fetching the location");

      const data = await res.json();
      const weatherData = data.list.map((timestamp) => {
        return {
          day: timestamp.dt_txt.split(" ")[0],
          temp: timestamp.main.temp,
          humidity: timestamp.main.humidity,
          weather: timestamp.weather[0].main,
          windSpeed: timestamp.wind.speed,
        };
      });
      const fiveDayAverageData = calculateFiveDayData(weatherData);
      console.log(fiveDayAverageData);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
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
        <Histories />
      </SearchBar>

      <Main>
        <Result />
      </Main>
    </>
  );
}

export default App;
