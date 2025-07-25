const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Store directly in Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "testimonies",
    allowed_formats: ["jpg", "jpeg", "png"],
    transformation: [{ width: 800, height: 800, crop: "limit" }],
  },
});

module.exports = multer({ storage });
