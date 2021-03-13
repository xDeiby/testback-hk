const mongoose = require("mongoose");

const personSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
