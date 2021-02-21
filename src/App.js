import './App.css';
import { useState } from 'react';
import {default as apiKey} from './apiKey.js';

// {  }
function Controller(props){
  return(
    <>
      <form onSubmit={props.getWeather}>
        <input id="zipInput" placeholder="zip, ie 48212"></input>
        <button>+</button>
      </form>
    </>
  );
}
function WeatherData(props){
  return(
    <>
      <h2>{props.data.name}</h2>
      <h2>{props.data.weather[0].description}</h2>
      <h2>{props.data.main.temp}</h2>
    </>
  );
}

function App() {
  let [zip, setZip] = useState(48212);
  let [weatherData, setWeatherData] = useState([]);

  let getWeather = e => {
    e.preventDefault();
    let newZip = document.getElementById("zipInput").value;
    // VALIDATE ZIP CODE HERE
    if(newZip.length > 1 ){
      setZip(newZip);
      console.log(newZip);
      weatherFetch();
    }
  }
  let weatherFetch = async _ =>{
    try{
     let url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${apiKey}`;
      const weatherCall = await fetch(url)
      .then(response => response.json())
      .then(weather => setWeatherData([weather]));
    } catch(e) {
      console.error(`yikes lmao looks like ya got a problemo`);
      console.error(e);
    }
  }

  weatherFetch();
  return (
    <>
      <header className="App-header">
        <a href="">
          <h1>Weather</h1>
        </a>
        <Controller getWeather={getWeather}/>
        <h2>Currently weatherin' out <i>{zip}</i></h2>
      </header>
      <div>
        {weatherData.map((e) => (<WeatherData data={e}/>))}
      </div>
    </>
  );
}

export default App;
