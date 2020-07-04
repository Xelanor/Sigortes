const express = require("express");
const cors = require("cors");
const socketio = require("socket.io");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

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

// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cors());
app.use(express.json());

app.use(passport.initialize());
require("./config/passport")(passport);

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// Routes
const usersRouter = require("./routes/users");
const roomsRouter = require("./routes/rooms");
const videoRouter = require("./routes/video");

// ADD THIS LINE
app.use(express.static("build"));

app.use("/api/users", usersRouter);
app.use("/api/rooms", roomsRouter);
app.use("/api/video", videoRouter);

// If no API routes are hit, send the React app
app.use(function (req, res) {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

var server = app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

const io = socketio(server);

io.on("connection", (socket) => {
  require("./sockets/socket")(io, socket);
  return io;
});
