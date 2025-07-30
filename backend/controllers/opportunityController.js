// File: controllers/opportunityController.js
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

// ✅ Update Opportunity
exports.updateOpportunity = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Opportunity.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updated) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ message: "Opportunity updated", updated });
  } catch (err) {
    res.status(500).json({ message: "Error updating opportunity" });
  }
};

// ✅ Delete Opportunity
exports.deleteOpportunity = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Opportunity.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ message: "Opportunity deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting opportunity" });
  }
};
