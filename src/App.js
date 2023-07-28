import React, { useEffect, useState } from "react";
import date from 'date-and-time';
import axios from "axios";
import "./App.css";

function App() {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [inputCity,setInputCity] = useState("");
  const [data,setData] = useState({});

  const weatherDetails = (cityName) =>{
    if(!cityName) alert ("Enter Valid City Name")
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    axios.get(apiURL).then(res =>{
      setData(res.data);
    }).catch(err=>{
      console.log(err)
    })

  };
  function handleChange(ev){
    setInputCity(ev.target.value)
    ev.preventDefault();
  }
  function handlesearch(){
    weatherDetails(inputCity)
    console.log(inputCity)


  }
  useEffect(()=>{
    weatherDetails('Delhi')
  },[])

  return (
    <div className="weather-app">
      <div className="container">
        <h1 className="brand">LiveWeather.com</h1>
                {/* <p>Feels like - {Math.floor(data?.main.feels_like)}&#176;</p> */}
        <div>
                <h2 className="temp">{Math.floor(data?.main?.temp)}&#176;</h2>
                <div className="city-time">
                    <h1 className="name">{data?.name}</h1>
                    <small style={{fontSize:"1em"}}>
                        <span className="date">{date.format(new Date(), 'dddd MMM DD')},&nbsp; &nbsp; </span>
                        <span className="time"> {date.format(new Date(), 'HH : mm ')} </span>
                    </small>
                </div>
                {/* <div class="weather" style={{fontSize:"1.5em"}}>
                <i class='bx bx-up-arrow-alt'>{Math.floor(data?.main?.temp_max)}</i> 
                <i class='bx bx-down-arrow-alt' >{Math.floor(data?.main?.temp_min)}</i>
                </div> */}
                <div class="weather">
                    <img src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`} className="icons" alt="icon" width="50" height="50" />
                    <span className="condition"  style={{fontSize:"2em"}}>{data?.weather[0]?.main}</span>
                </div>

            </div>
      </div>
      <div className="panel">
            <form id="locationInput">
                <input type="text" className="search" name="cityName" value={inputCity} onChange={handleChange}  placeholder="Location" autoCapitalize="true" required="true" autoComplete="off" />
                <button type="button" className="submit" onClick={handlesearch}>
                    <i class='bx bx-search'></i>
                </button>
            </form>
            
            <ul className="details">
                <h4>Details</h4>
                <li>
                    <span>Description</span>
                    <span className="cloud"> &nbsp;{data?.weather[0].description}</span>
                </li>
                <li>
                    <span>Humidity</span>
                    <span className="Humidity">&nbsp;{data?.main?.humidity} %</span>
                </li>
                <li>
                    <span>Wind</span>
                    <span className="wind">&nbsp;{data?.wind?.speed} km/h</span>
                </li>
                <li>
                    <span>Pressure</span>
                    <span className="wind">&nbsp;{data?.main?.pressure} mBar</span>
                </li>
                
                <li>
                    <span>Clouds</span>
                    <span className="wind">&nbsp;{data?.clouds?.all} %</span>
                </li>
                {/* <li>
                    <span>Sunrise</span>
                    <span className="wind">&nbsp;{data?.wind?.speed} km/h</span>
                </li>
                <li>
                    <span>Sunset</span>
                    <span className="wind">&nbsp;{data?.wind?.speed} km/h</span>
                </li> */}
            </ul>
        </div>
    </div>
  );
}

export default App;
