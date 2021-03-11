import React, { useState, useEffect } from "react";
import personService from "./services/persons";
import { Filter, PersonForm, Persons, Notification } from "./components";

const App = () => {
  const [persons, setPersons] = useState(null);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterPersons, setFilterPersons] = useState("");
  const [notifMessage, setNotifMessage] = useState(null);
  const [notifType, setNotifType] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
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
      const id = doesExists.id;
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService.update(id, personObject).then((returnedPerson) => {
          const updatedPersonsObj = persons.map((person) =>
            person.id !== id ? person : returnedPerson
          );
          setPersons(updatedPersonsObj);
          setNewName("");
          setNewNumber("");
        });
      }
      return;
    }

    personService.create(personObject).then((returnedPerson) => {
      setNotifMessage(`Added ${returnedPerson.name}`);
      setNotifType("successful");
      setTimeout(() => setNotifMessage(null), 3000);
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
    });
  };

  const deletePerson = (id) => {
    const foundPerson = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${foundPerson.name}`)) {
      personService
        .deleteObj(id)
        .then(() => {
          const newPersonsObject = persons.filter((person) => person.id !== id);
          setPersons(newPersonsObject);
        })
        .catch((error) => {
          setNotifMessage(
            `Information of ${foundPerson.name} has already been removed from the server`
          );
          setNotifType("error");
          setTimeout(() => setNotifMessage(null), 3000);
        });
    }
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
      <Notification message={notifMessage} type={notifType} />

      <Filter action={handleFilterChange} value={filterPersons} />

      <h2>Add a new</h2>

      <PersonForm data={formData} />

      <h2>Numbers</h2>

      {!!persons &&
        persons.map((person) => (
          <Persons
            key={person.id}
            person={person}
            action={() => deletePerson(person.id)}
          />
        ))}
    </div>
  );
};

export default App;
