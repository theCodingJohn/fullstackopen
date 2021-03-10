import React from "react";

const PersonForm = ({ data }) => {
  return (
    <form>
      <div>
        name: <input onChange={data.handleNameChange} value={data.newName} />
      </div>
      <div>
        number:{" "}
        <input onChange={data.handleNumberChange} value={data.newNumber} />
      </div>
      <div>
        <button onClick={data.addPerson} type="submit">
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
