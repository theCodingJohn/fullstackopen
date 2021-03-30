import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import Select from "react-select";

import { EDIT_AUTHOR, GET_AUTHORS } from "../queries";

const BirthYearForm = ({ options }) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [changeBirthYear] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: GET_AUTHORS }],
  });

  const submit = async (event) => {
    event.preventDefault();

    await changeBirthYear({ variables: { name, setBornTo: parseInt(born) } });
    setName("");
    setBorn("");
  };

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <Select
          onChange={({ value }) => {
            setName(value);
          }}
          options={options}
        />
        <div>
          born
          <input
            onChange={({ target }) => setBorn(target.value)}
            value={born}
            type="text"
            name="born"
            placeholder="born"
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default BirthYearForm;
