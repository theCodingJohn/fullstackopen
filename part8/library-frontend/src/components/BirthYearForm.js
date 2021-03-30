import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { EDIT_AUTHOR, GET_AUTHORS } from "../queries";

const BirthYearForm = () => {
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
        <div>
          name
          <input
            onChange={({ target }) => setName(target.value)}
            value={name}
            type="text"
            name="name"
            placeholder="name"
          />
        </div>
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
