const mongoose = require('mongoose');
require("dotenv").config();

let mongoURI = process.env.mongoURI;

const connectToMongo = () => {
    mongoose.connect(mongoURI, (req, res) => {
        console.log("MongoDB connected successfully");
    })
}

module.exports = connectToMongo;