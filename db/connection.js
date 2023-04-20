const mongoose = require("mongoose");
const DB_URI = process.env.DB_URI;
const connectToDatabase = () => {
  mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
module.exports = connectToDatabase;
