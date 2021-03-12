import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import Person from "./models/person.js";

const app = express();

morgan.token("body", (request, response) => JSON.stringify(request.body));

app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(express.static("build"));

app.get("/info", (request, response) => {
  Person.find({}).then((people) => {
    response.send(`<p>Phonebook has info for ${people.length} people</p>
    <p>${new Date()}</p>
  `);
  });
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((people) => {
    response.json(people);
  });
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  const duplicateName = phonebook.find((person) => {
    return person.name.toLowerCase === body.name.toLowerCase;
  });

  if (!body.name) {
    return response.status(400).json({
      error: "Name is missing",
    });
  } else if (!body.number) {
    return response.status(400).json({
      error: "Number is missing",
    });
  } else if (!!duplicateName) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const newPerson = body;
  newPerson.id = generateId();

  phonebook = phonebook.concat(newPerson);

  response.json(phonebook);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = parseInt(request.params.id);
  phonebook = phonebook.filter((person) => person.id !== id);
  response.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
