import React, { useState } from "react";
import { ListCountries } from "./components";

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
