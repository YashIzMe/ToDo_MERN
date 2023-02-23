const mongoose = require('mongoose');

const dotenv=require("dotenv");
dotenv.config();

const connectDatabase = () => {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongoose Connected");
    }).catch((error) => {
        console.log(error);
    });
}

mongoose.set("strictQuery",false);
module.exports = connectDatabase;