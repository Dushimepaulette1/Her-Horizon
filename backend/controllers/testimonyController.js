const Testimony = require("../models/Testimony");

exports.getAllTestimonies = async (req, res) => {
  const testimonies = await Testimony.find();
  res.status(200).json(testimonies);
};

exports.submitTestimony = async (req, res) => {
  const { description, name, fieldOfStudy } = req.body;
  const image = req.file?.filename;

  const testimony = new Testimony({ image, description, name, fieldOfStudy });
  await testimony.save();

  res.status(201).json({ message: "Testimony submitted" });
};
