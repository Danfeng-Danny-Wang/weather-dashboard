export function calculateFiveDayData(weatherData) {
  const fiveDayData = [[], [], [], [], []];

  let currentDay = 0;
  let currentTime = weatherData[0].day;

  for (let i = 0; i < weatherData.length; i++) {
    if (weatherData[i].day !== currentTime) {
      currentDay = currentDay + 1;
      currentTime = weatherData[i].day;
    }
    if (currentDay === 5) break;
    fiveDayData[currentDay].push(weatherData[i]);
  }

  const fiveDayAverageData = [[], [], [], [], []];
  for (let i = 0; i < fiveDayData.length; i++) {
    fiveDayAverageData[i] = fiveDayData[i].reduce(
      (acc, cur) => {
        return {
          day: cur.day,
          temp:
            Math.round((acc.temp + cur.temp / fiveDayData[i].length) * 100) /
            100,
          humidity:
            Math.round(
              (acc.humidity + cur.humidity / fiveDayData[i].length) * 100
            ) / 100,
          weather: cur.weather,
          windSpeed:
            Math.round(
              (acc.windSpeed + cur.windSpeed / fiveDayData[i].length) * 100
            ) / 100,
        };
      },
      { day: "", temp: 0, humidity: 0, weather: "", windSpeed: 0 }
    );
  }

  return fiveDayAverageData;
}
