const mongoose = require("mongoose");

const testimonySchema = new mongoose.Schema({
  image: String,
  description: String,
  name: String,
  fieldOfStudy: String,
});

module.exports = mongoose.model("Testimony", testimonySchema);
