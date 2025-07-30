// File: routes/opportunityRoutes.js
const express = require("express");
const {
  getAllOpportunities,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
} = require("../controllers/opportunityController");
const authenticate = require("../middleware/auth");

const router = express.Router();

router.get("/", getAllOpportunities);
router.post("/", authenticate, createOpportunity);

// ✅ Add these:
router.put("/:id", authenticate, updateOpportunity);
router.delete("/:id", authenticate, deleteOpportunity);

module.exports = router;
