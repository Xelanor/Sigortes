const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema(
  {
    available: {
      type: Boolean,
      required: true,
    },
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    guest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    guest_2: {
      type: Map,
      of: String,
    },
    start: {
      type: Date,
    },
    room_sid: {
      type: String,
    },
    room_name: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
