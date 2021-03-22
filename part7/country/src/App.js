import React, { useState, useEffect } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return {
    type,
    value,
    onChange,
    reset,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const countryData = await axios.get(
          `https://restcountries.eu/rest/v2/name/${name.replace(
            / /g,
            "%20"
          )}?fullText=true`
        );
        setCountry(countryData.data[0]);
      } catch (e) {
        setCountry(undefined);
      }
    };

    if (name !== "") {
      fetchApi();
    }
  }, [name]);

  return country;
};

const Country = ({ country }) => {
  if (country === null) {
    return null;
  }

  if (country === undefined) {
    return <div>not found...</div>;
  }

  return (
    <div>
      <h3>{country.name} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div>
      <img src={country.flag} height="100" alt={`flag of ${country.name}`} />
    </div>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
    nameInput.reset();
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input
          type={nameInput.type}
          value={nameInput.value}
          onChange={nameInput.onChange}
        />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
