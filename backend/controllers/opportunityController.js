// File: controllers/opportunityController.js
const Opportunity = require("../models/Opportunity");

exports.getAllOpportunities = async (req, res) => {
  try {
    const { category } = req.query;
    const query = category && category !== "all" ? { category } : {};
    const opportunities = await Opportunity.find(query).lean();
    res.status(200).json(opportunities);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch opportunities", error: err.message });
  }
};

exports.createOpportunity = async (req, res) => {
  try {
    const newOpportunity = new Opportunity(req.body);
    await newOpportunity.save();
    res.status(201).json({ message: "Opportunity created", opportunity: newOpportunity });
  } catch (err) {
    res.status(400).json({ message: "Failed to create opportunity", error: err.message });
  }
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
