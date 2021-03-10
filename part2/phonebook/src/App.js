import React, { useState, useEffect } from "react";
import axios from "axios";
import { Filter, PersonForm, Persons } from "./components";

const App = () => {
  const [persons, setPersons] = useState(null);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterPersons, setFilterPersons] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((res) => {
      const data = res.data;
      setPersons(data);
    });
  }, []);

  const addPerson = (e) => {
    e.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
    };

    const doesExists = persons.find(
      (person) => person.name.toLowerCase() === personObject.name.toLowerCase()
    );

    if (!!doesExists) {
      return alert(`${newName} is already added to phonebook`);
    }

    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterChange = (e) => {
    const searchValue = e.target.value;
    setFilterPersons(e.target.value);

    const filtered = persons.filter((person) =>
      person.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    setPersons(filtered);
  };

  const formData = {
    handleNameChange,
    newName,
    handleNumberChange,
    newNumber,
    addPerson,
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter action={handleFilterChange} value={filterPersons} />

      <h2>Add a new</h2>

      <PersonForm data={formData} />

      <h2>Numbers</h2>

      <Persons persons={persons} />
    </div>
  );
};

export default App;
