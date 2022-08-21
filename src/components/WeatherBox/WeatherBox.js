import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';

const WeatherBox = (props) => {

  const [weather, setWeather] = useState();

  const handleCityChange = useCallback((city) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3a46d76c45d8cf4ee0ffb61855326212&units=metric`)
      .then(response => response.json())
      .then(data => {
        setWeather ({
          city: data.name,
          temp: data.main.temp,
          icon: data.weather[0].icon,
          description: data.weather[0].main
        });
      });
        console.log(city);
  }, [] );

  return (
    <section>
      <PickCity action={handleCityChange} />
      <WeatherSummary {...weather} />
      <Loader />
    </section>
  )
};

export default WeatherBox;
