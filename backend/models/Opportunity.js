const mongoose = require("mongoose");

const opportunitySchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ["Education", "Skills", "Career", "Mentorship"],
    required: true,
  },
  title: String,
  description: String,
  date: {
    type: Date,
    required: false,
  },
  link: String,
});

// Virtual for formatted date
opportunitySchema.virtual("formattedDate").get(function () {
  if (!this.date) return null;
  const year = this.date.getFullYear();
  const month = `0${this.date.getMonth() + 1}`.slice(-2);
  const day = `0${this.date.getDate()}`.slice(-2);
  return `${year}-${month}-${day}`;
});

// Enable virtuals to be included in JSON
opportunitySchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Opportunity", opportunitySchema);
