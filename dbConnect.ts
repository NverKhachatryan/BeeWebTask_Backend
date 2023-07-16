// external imports
const mongoose = require("mongoose");
require("dotenv").config();

async function dbConnect() {
  // use mongoose to connect this app to our database on mongoDB using the DB_URL (connection string)
  mongoose
    .connect(
      "mongodb+srv://khachatryan_nver:WRhXVgcmXuPr0d2m@beeweb.bxeke59.mongodb.net/?retryWrites=true&w=majority",
      { retryWrites: true, w: 'majority' }
    )
    .then(() => {
      console.log("Successfully connected to MongoDB Atlas!");
    })
    .catch((error: Error) => {
      console.log("Unable to connect to MongoDB Atlas!");
      console.error(error);
    });
}

module.exports = dbConnect;
