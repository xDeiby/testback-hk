// Imports
const express = require("express");
const morgan = require("morgan");
// const morgan_middleware = require("./middlewares/morgan._middleware.js");
const cors = require("cors");
require("dotenv").config();
require("./mongo");

const Person = require("./models/Persons");
let persons = require("./data/persons.json");

// Errors middlewares
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.static("build"));
// app.use(morgan_middleware);

// Routes
app.get("/", (req, res) => {
  Person;
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then((result) => {
    res.status(200).json(result);
  });
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((result) => {
      result ? res.status(200).json(result) : res.status(404).end();
    })
    .catch((error) => next(error));

  // const id = Number(req.params.id);
  // const person = persons.find((person) => person.id === id);

  // person ? res.status(200).json(person) : res.status(404).end();
});

app.get("/api/info", (req, res) => {
  const num_persons = persons.length;
  const date = new Date();

  res
    .status(200)
    .send(`<p>Phonebook has info for ${num_persons} persons</p><p>${date}</p>`);
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => res.status(204).end())
    .catch((error) => next(error));
  // const id = Number(req.params.id);
  // persons = persons.filter((person) => person.id !== id);
  // res.status(204).end();
});

app.post("/api/persons", (req, res, next) => {
  const body = req.body;

  const new_person = new Person({
    name: body.name,
    phone: body.phone,
  });

  new_person
    .then((result) => res.status(201).json(result))
    .catch((error) => next(error));

  // if (!body.name || !body.phone)
  //   return res.status(400).json({
  //     error: "missing content",
  //   });
  // else if (persons.map((person) => person.name).includes(body.name)) {
  //   return res.status(409).json({
  //     error: "name already exist",
  //   });
  // }

  // body.id = Math.random(1, 1000);
  // persons.push(body);

  // res.status(201).json(body);
});

app.put("/api/persons/:id", (req, res, next) => {
  if (!req.body.name || !req.body.phone)
    return res.status(400).json({ error: "missing content" });

  const personUpdate = { name: req.body.name, phone: req.body.phone };

  Person.findByIdAndUpdate(req.params.id, personUpdate, { new: true })
    .then((result) => res.status(200).json(result))
    .catch((error) => next(error));
});

//
app.use(notFound);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});
