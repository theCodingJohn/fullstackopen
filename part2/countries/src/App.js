import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";

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
  return (
    <>
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
    </>
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

const App = () => {
  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearch(searchValue);
  };

  return (
    <div>
      <div>
        find countries <input onChange={handleSearchChange} value={search} />
      </div>
      <ListCountries search={search} />
    </div>
  );
};

export default App;
