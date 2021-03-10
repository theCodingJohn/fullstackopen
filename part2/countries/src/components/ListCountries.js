import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY;

const Countries = ({ countries, action }) => {
  return (
    <>
      {countries.map((country) => {
        return (
          <Fragment key={country.cioc}>
            <span>{country.name} </span>
            <button onClick={() => action(country)}>show</button> <br />
          </Fragment>
        );
      })}
    </>
  );
};

const Country = ({ country }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${apiKey}&query=${country.capital}`
      )
      .then((res) => {
        const data = res.data;
        setWeatherData(data.current);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul>
        {country.languages.map((lang) => (
          <li key={lang.name}>{lang.name}</li>
        ))}
      </ul>
      <img alt="flag" style={{ width: 90, height: 90 }} src={country.flag} />
      <h2>Weather in ${country.capital}</h2>
      {!!weatherData && (
        <>
          <p>
            <strong>temperature </strong>
            {weatherData.temperature} Celcius
          </p>
          <img
            alt="weater icon"
            src={weatherData.weather_icons}
            style={{ width: 50, height: 50 }}
          />
          <p>
            <strong>wind </strong>
            {weatherData.wind_speed} mph direction {weatherData.wind_dir}
          </p>
        </>
      )}
    </div>
  );
};

const ListCountries = ({ search }) => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(null);

  const showDetails = (country) => {
    setCountry(country);
  };

  useEffect(() => {
    if (search !== "") {
      axios
        .get(`https://restcountries.eu/rest/v2/name/${search}`)
        .then((res) => {
          const data = res.data;
          if (data.length === 1) {
            setCountry(data[0]);
          }
          setCountries(data);
        });
    }
  }, [search]);

  return (
    <div>
      {countries.length > 10 && <p>Too many matches, specify another filter</p>}
      {countries.length < 10 && countries.length !== 1 && (
        <Countries countries={countries} action={showDetails} />
      )}
      {!!country && <Country country={country} />}
    </div>
  );
};

export default ListCountries;
