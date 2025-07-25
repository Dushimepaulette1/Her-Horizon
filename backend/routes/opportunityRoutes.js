const express = require("express");
const {
  getAllOpportunities,
  createOpportunity,
} = require("../controllers/opportunityController");
const authenticate = require("../middleware/auth");

const router = express.Router();

router.get("/", getAllOpportunities);
router.post("/", authenticate, createOpportunity);

module.exports = router;
