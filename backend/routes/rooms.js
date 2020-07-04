const router = require("express").Router();
let Room = require("../models/room");

router.route("/").get((req, res) => {
  Room.find()
    .then((req) => res.json(req))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const available = req.body.available;
  const newRoom = new Room({ available });

  newRoom
    .save()
    .then((room) => {
      res.json("Room added!");
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/available").post((req, res) => {
  Room.findOneAndUpdate(
    { host: req.body.host },
    { $set: { available: req.body.available } }
  )
    .then(() => res.json("Available State Changed!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/available").get((req, res) => {
  Room.find({ available: true })
    .then((room) => res.json(room.length))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/available/:room").get((req, res) => {
  Room.findOne({ room_name: req.params.room })
    .select("available")
    .then((available) => res.json(available))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
