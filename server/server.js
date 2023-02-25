const express = require("express");
const app = express();
const cors = require("cors");
const cookie = require('cookie-parser');
require("dotenv").config({ path: "./.env" });
const port = process.env.PORT || 5000;
// cors for saving cookies
const corsConfig = {
  origin: true,
  credentials: true,
};
app.use(cors(corsConfig));
app.options('*', cors(corsConfig))
app.use(express.json());
app.use(cookie());
// get driver connection
const connectDatabase = require("./db/conn");
 
connectDatabase();
app.use("/api",require('./routes/record'))

app.listen(port, () => {
  // perform a database connection when server starts
  console.log(`Server is running on port: ${port}`);
});
