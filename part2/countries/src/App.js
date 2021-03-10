import React, { useState, useEffect } from "react";
import axios from "axios";

const Countries = ({ countries }) => {
  return (
    <>
      {countries.map((country) => (
        <p key={country.cioc}>{country.name}</p>
      ))}
    </>
  );
};

const Country = ({ countries }) => {
  return (
    <>
      <h1>{countries[0].name}</h1>
      <p>capital {countries[0].capital}</p>
      <p>population {countries[0].population}</p>
      <h2>languages</h2>
      <ul>
        {countries[0].languages.map((lang) => (
          <li key={lang.name}>{lang.name}</li>
        ))}
      </ul>
      <img
        alt="flag"
        style={{ width: 90, height: 90 }}
        src={countries[0].flag}
      />
    </>
  );
};

const App = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);

  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearch(searchValue);
  };

  useEffect(() => {
    axios.get(`https://restcountries.eu/rest/v2/name/${search}`).then((res) => {
      const data = res.data;
      setCountries(data);
    });
  }, [search]);

  return (
    <div>
      <div>
        find countries <input onChange={handleSearchChange} value={search} />
      </div>

      <div>
        {countries.length > 10 && (
          <p>Too many matches, specify another filter</p>
        )}
        {countries.length === 1 && <Country countries={countries} />}
        {countries.length < 10 && <Countries countries={countries} />}
      </div>
    </div>
  );
};

export default App;
