const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const alert = require("alert");

const internal = require("stream");
const res = require("express/lib/response");

// databaselocal=mongodb://localhost/ContactDance
mongoose.connect(
  process.env.DATABASE ||
    "mongodb+srv://Akashgreninja:Pokemonprimape%4013@cluster0.bdfqg.mongodb.net/ContactDance"
);

// mongoose.connect("mongodb://localhost/ContactDance",{useNewUrlParser :true})

const app = express();
const port = process.env.PORT || 5000
// const port = 8000;

//schemas

var ContactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
  concern: String,
});
const Contact = mongoose.model("Contact", ContactSchema);

app.use("/static", express.static("static"));
app.use(express.urlencoded());

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.status(200).render("home.pug");
});

app.get("/contact", (req, res) => {
  res.status(200).render("contact.pug");
});

app.post("/contact", (req, res) => {
  var Data = new Contact(req.body);
  Data.save()
    .then(() => {
      // res.status(200).render("contact.pug")
      res.status(200).send("saved");
    })
    .catch(() => {
      res.status(400).send("failed");
    });
});

app.listen(port, () => {
  console.log("started woah");
});
