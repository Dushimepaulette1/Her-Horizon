const Opportunity = require("../models/Opportunity");

exports.getAllOpportunities = async (req, res) => {
  const { category } = req.query;
  const query = category && category !== "all" ? { category } : {};
  const opportunities = await Opportunity.find(query);
  res.status(200).json(opportunities);
};

exports.createOpportunity = async (req, res) => {
  const newOpportunity = new Opportunity(req.body);
  await newOpportunity.save();
  res.status(201).json({ message: "Opportunity created" });
};
