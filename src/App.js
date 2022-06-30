import React, { useState, useEffect } from "react";
import axios from "axios";

// API RETURNS A JSON FILE WITH ALL THE DATA FOR THE WEATHER IN THE AREA
// YOU SPECIFIED, WE THEN EXTRACT THE DATA WE NEED AND DISPLAY IT.

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=21a70bb83ba188e56f83658dedeb2fda`;

  // Using Axios, Runs The url And Returns The JSON Data
  // In The Variable 'data' So We Can Extract Info
  const searchLocation = (event) => {
    if (event.key === "Enter") {
      try {
        axios.get(url).then((response) => {
          setData(response.data);
          setWeather(response.data.weather[0].main);
        });
        setLocation("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    console.clear();
    console.log(data);
    console.log(weather);
  }, [data, weather]);

  return (
    <div className={`app ${weather}`}>
      <div className="search-bar">
        {/* Runs The searchLocation Button When Enter Is Pressed And Passing What Location Was Entered In The Search Bar To 'location' */}
        <input
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Search..."
        />
      </div>
      {/* App Container */}
      <div className="container">
        {/* Top Section */}
        <div className="top-section">
          <div className="location-section">
            <p>{data.name}</p>
          </div>
          <div className="temp-section">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          {data.sys ? (
            <p className="location-section">{data.sys.country}</p>
          ) : null}
          <div className="description-section">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        {/* End Of Top Section */}

        {/* Bottom Section */}
        {data.name !== undefined && (
          <div className="bottom-section">
            <div className="feels-section">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()} °F</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity-section">
              {data.main ? (
                <p className="bold">{data.main.humidity.toFixed()} °F</p>
              ) : null}
              <p>Humidity</p>
            </div>
            <div className="wind-section">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} MPH</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
            <div className="description-area">
              {data.weather ? (
                <p className="bold">{data.weather[0].description}.</p>
              ) : null}
              <p>Weather Description</p>
            </div>
          </div>
        )}
        {/* End Of Bottom Section */}
      </div>
    </div>
  );
}

export default App;
