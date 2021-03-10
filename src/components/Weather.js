import React, { useEffect, useState } from 'react'
import weather from 'openweather-apis';

const Weather = () => {

  const [currentTemp, setCurrentTemp] = useState(null);
  const [currentForecast, setCurrentForecast] = useState(null);

  const [currentWeather, setCurrentWeather] = useState('');




  useEffect(() => {


    const setWeather = async () => {
      try {
        await weather.setAPPID(process.env.REACT_APP_WEATHER_API_KEY);
        await weather.setCityId(2643743);
        await weather.setUnits('metric');
        await weather.setLang('en');
        weather.getTemperature(async (err, temp) => {
          await setCurrentTemp(Math.round(temp));
        })
        weather.getDescription(async (err, desc) => {
          await setCurrentForecast(desc);
        })
      } catch (err) {
        if (err) console.log(err);
      }
    }

    setWeather();

  }, [])








  return <p>{currentForecast ? `London UK ${currentTemp}°C ${currentForecast}` : `London UK`}</p>;
}

export default Weather;

