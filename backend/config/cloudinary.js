const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dov9rh0ze",
  api_key: process.env.CLOUDINARY_API_KEY || "673389513911617",
  api_secret: process.env.CLOUDINARY_API_SECRET || "dYAZgqvpZSJXsSAQrlYoeJnpdXg",
});

module.exports = cloudinary;
