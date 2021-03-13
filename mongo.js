const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((result) => console.log("Connected to MongoDB"))
  .catch((error) => console.error(error));

//  *Excercise

// if (process.argv.length < 3) {
//   console.log(
//     "Please provide the password and Person as an argument: node mongo.js <password> <name> <phone>"
//   );
//   process.exit(1);
// }

// const password = process.argv[2];
// const URL = `mongodb+srv://userAdmin:${password}@cluster0.qhau6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// mongoose.connect(URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true,
// });

// // Esquema
// const personSchema = mongoose.Schema({
//   name: String,
//   phone: String,
// });

// // Modelo
// const Person = mongoose.model("Person", personSchema);

// if (process.argv.length === 3) {
//   Person.find({}).then((result) => {
//     console.log("Phonebook:");
//     result.forEach((person) => {
//       console.log(person.name, person.phone);
//     });

//     mongoose.connection.close();
//   });
// } else {
//   const person = new Person({
//     name: process.argv[3],
//     phone: process.argv[4],
//   });

//   person.save().then((result) => {
//     console.log(
//       `added ${process.argv[3]} number ${process.argv[4]} to phonebook`
//     );
//     mongoose.connection.close();
//   });
// }
