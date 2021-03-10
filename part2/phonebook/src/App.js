import React, { useState } from "react";
import { Filter, PersonForm, Persons } from "./components";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterPersons, setFilterPersons] = useState("");

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
