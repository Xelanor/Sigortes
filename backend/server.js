const express = require("express");
const cors = require("cors");
const socketio = require("socket.io");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

var log = require("loglevel");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

app.use(passport.initialize());
require("./config/passport")(passport);

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

// Routes
const usersRouter = require("./routes/users");

app.use("/api/users", usersRouter);

var server = app.listen(port, () => {
  log.warn(`Server is running on port: ${port}`);
});

const io = socketio(server);

io.on("connection", (socket) => {
  log.warn("We have a new connection.");

  socket.on("online input", ({ online }) => {
    console.log(online);
    return io.emit("online output", !online);
  });

  socket.on("disconnect", () => {
    log.warn("User had left!!!");
  });
});
