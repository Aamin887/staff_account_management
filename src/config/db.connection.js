const mongoose = require("mongoose");

const db = async function () {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {});
    console.log(`Database connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = db;
