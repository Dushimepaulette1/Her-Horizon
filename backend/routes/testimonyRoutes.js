const express = require("express");
const multer = require("multer");
const {
  getAllTestimonies,
  submitTestimony,
} = require("../controllers/testimonyController");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get("/", getAllTestimonies);
router.post("/", upload.single("image"), submitTestimony);

module.exports = router;
