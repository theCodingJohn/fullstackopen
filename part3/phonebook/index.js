import express, { request, response } from "express";
import morgan from "morgan";

const app = express();

let phonebook = [
  {
    id: 1,
    name: "Artaro Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "039-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abranov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendick",
    number: "30-23-6423122",
  },
];

const generateId = () => Math.floor(Math.random() * 1000) + 4;

morgan.token("body", (request, response) => JSON.stringify(request.body));

app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/info", (request, response) => {
  response.send(`<p>Phonebook has infor for ${phonebook.length} people</p>
    <p>${new Date()}</p>
  `);
});

app.get("/api/persons", (request, response) => {
  console.log(morgan);
  response.json(phonebook);
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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
