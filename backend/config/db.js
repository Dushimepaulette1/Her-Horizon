const mongoose = require("mongoose");

module.exports = () => {
  mongoose
    .connect(
      process.env.MONGODB_URI ||
        "mongodb+srv://dushime:rrgEw0zWMtS9iWiA@cluster0.gbi3qsl.mongodb.net/",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log("🗄️  MongoDB connected"))
    .catch((err) => {
      console.error("❌  DB connection error:", err.message);
      process.exit(1);
    });
};
