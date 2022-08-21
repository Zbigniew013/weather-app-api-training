import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback } from 'react';

const WeatherBox = (props) => {

  const handleCityChange = useCallback((city) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3a46d76c45d8cf4ee0ffb61855326212&units=metric`)
      .then(response => response.json())
      .then(data => {
     console.log(data);
    });
    console.log(city);
  }, [] );

  return (
    <section>
      <PickCity action={handleCityChange} />
      <WeatherSummary />
      <Loader />
    </section>
  )
};

export default WeatherBox;
