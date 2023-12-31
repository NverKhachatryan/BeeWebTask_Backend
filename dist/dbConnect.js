"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// external imports
const mongoose = require("mongoose");
require("dotenv").config();
function dbConnect() {
    return __awaiter(this, void 0, void 0, function* () {
        // use mongoose to connect this app to our database on mongoDB using the DB_URL (connection string)
        mongoose
            .connect("mongodb+srv://khachatryan_nver:WRhXVgcmXuPr0d2m@beeweb.bxeke59.mongodb.net/?retryWrites=true&w=majority", { retryWrites: true, w: 'majority' })
            .then(() => {
            console.log("Successfully connected to MongoDB Atlas!");
        })
            .catch((error) => {
            console.log("Unable to connect to MongoDB Atlas!");
            console.error(error);
        });
    });
}
module.exports = dbConnect;
