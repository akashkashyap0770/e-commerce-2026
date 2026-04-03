const mongoose = require("mongoose");

const MongodbConnected = async (url) => {
  console.log(url)
  try {
    await mongoose.connect(url);
    console.log("✅ MongoDB Connected Successfully.");
  } catch (error) {
    console.log(error);
  }
};

module.exports = MongodbConnected;
