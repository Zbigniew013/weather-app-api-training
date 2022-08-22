import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';
import ErrorBox from '../ErrorBox/ErrorBox';

const WeatherBox = (props) => {

  const [weather, setWeather] = useState();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

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
        setError(true);
      }
    });
      console.log(city);
      setError(false);
  }, [] );

  return (
    <section>
      <PickCity action={handleCityChange} />
      { ( weather && !error ) &&  <WeatherSummary {...weather} /> }
      { ( pending && !error ) && <Loader /> }
      { error && <ErrorBox /> }
    </section>
  )
};

export default WeatherBox;
