// Imports
const express = require("express");
const morgan = require("morgan");
const morgan_middleware = require("./middlewares/morgan._middleware.js");
const cors = require("cors");

require("dotenv").config();

let persons = require("./data/persons.json");

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.static("build"));
// app.use(morgan_middleware);

// Routes
app.get("/", (req, res) => {
  res.send("<h1>Hola Mundo</h1>");
});

app.get("/api/persons", (req, res) => {
  res.status(200).json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);

  person ? res.status(200).json(person) : res.status(404).end();
});

app.get("/api/info", (req, res) => {
  const num_persons = persons.length;
  const date = new Date();

  res
    .status(200)
    .send(`<p>Phonebook has info for ${num_persons} persons</p><p>${date}</p>`);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.phone)
    return res.status(400).json({
      error: "missing content",
    });
  else if (persons.map((person) => person.name).includes(body.name)) {
    return res.status(409).json({
      error: "name already exist",
    });
  }

  body.id = Math.random(1, 1000);
  persons.push(body);

  res.status(201).json(body);
});

//

app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}/`);
});
