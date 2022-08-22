import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';

const WeatherBox = (props) => {

  const [weather, setWeather] = useState();
  const [pending, setPending] = useState(false);

  const handleCityChange = useCallback((city) => {
    setPending(true);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3a46d76c45d8cf4ee0ffb61855326212&units=metric`)
      .then(response => {
        if(response.status === 200) {
        response.json()
      .then(data => {
        setWeather ({
          city: data.name,
          temp: data.main.temp,
          icon: data.weather[0].icon,
          description: data.weather[0].main
        });
        setPending(false);
      });
      } else {
        alert('ERROR!')
      }
    });
        console.log(city);
  }, [] );

  return (
    <section>
      <PickCity action={handleCityChange} />
      { weather &&  <WeatherSummary {...weather} /> }
      { pending && <Loader /> }
    </section>
  )
};

export default WeatherBox;
