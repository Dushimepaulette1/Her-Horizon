const mongoose = require("mongoose");

const opportunitySchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ["Education", "Skills", "Career", "Mentorship"],
    required: true,
  },
  title: String,
  description: String,
  date: Date,
  link: String,
});

module.exports = mongoose.model("Opportunity", opportunitySchema);
