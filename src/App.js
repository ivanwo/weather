import './App.css';
import { useState } from 'react';

function WeatherCard(props){
  return(
    <>
      <div id="forecast-box">{props.weather.periods[0].detailedForecast}</div>
      <img src={props.weather.periods[0].icon}/>
    </>
  );
}

function App() {
  let [weatherData, setWeatherData] = useState(null);
  let [initialWeather, setInitialWeather] = useState({});
  let [city, setCity] = useState("anonymous");

  let getLocation = _ => 
    navigator.geolocation.getCurrentPosition(sayLocation, locationError);
  let sayLocation = location =>  {
    console.log(`i see you at ${location.coords.latitude} ${location.coords.longitude}`);
    fetchWeather(location);
  }
  let locationError = error => 
    alert(`Problem! ${error}`);
  let fetchWeather = async coords => {
    let url = `https://api.weather.gov/points/${coords.coords.latitude.toFixed(3)},${coords.coords.longitude.toFixed(3)}`;
    const weatherCall = await fetch(url)
      .then(response => response.json())
      .then(initialWeather => {
        setInitialWeather(initialWeather);
        setCity(initialWeather.properties.relativeLocation.properties.city);
        fetchPreciseWeather(initialWeather.properties.forecast);
    });
  }
  let fetchPreciseWeather = async url => {
      const weatherCall = await fetch(url)
        .then(response => response.json())
        .then(data => {
          setWeatherData(data.properties);
          console.log(data.properties);
        })
  }

  return (
    <>
      <header className="App-header">
        <a href="">
          <h1>Weather</h1>
        </a>
        <button onClick={getLocation}>locate me daddy</button>
        <h2>Currently weatherin' out <i>{city}</i></h2>
        {(weatherData != null ? <WeatherCard weather={weatherData}/>: <></>)
        }
      </header>
    </>
  );
}

export default App;
