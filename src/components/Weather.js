import React, { useEffect, useState } from 'react'
import weather from 'openweather-apis';

const Weather = () => {



  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [currentTemp, setCurrentTemp] = useState('');
  const [currentForecast, setCurrentForecast] = useState('');

  const [currentWeather, setCurrentWeather] = useState('');




  useEffect(() => {
    const getLocation = async () => {
      await window.navigator.geolocation.getCurrentPosition(pos => {
        setLatitude(pos.coords.latitude);
        setLongitude(pos.coords.longitude);
      })
    }
    getLocation();

    const setWeather = async () => {
      try {
        await weather.setAPPID(process.env.REACT_APP_WEATHER_API_KEY);
        await weather.setCoordinate(latitude, longitude);
        await weather.setUnits('metric');
        await weather.setLang('en');

        await weather.getTemperature((err, temp) => {
          setCurrentTemp(Math.round(temp));
        })

        await weather.getDescription((err, desc) => {
          setCurrentForecast(desc);
        })

        setCurrentWeather(`${currentTemp} degrees, ${currentForecast}`)
      } catch (err) {
        if (err) console.log(err);
      }
    }

    setWeather();

  }, [currentForecast])







  return <p>{currentForecast ? currentWeather : ''}</p>;
}

export default Weather;

