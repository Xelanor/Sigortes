const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
var log = require("loglevel");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  log.warn("MongoDB database connection established successfully");
});

app.listen(port, () => {
  log.warn(`Server is running on port: ${port}`);
});
