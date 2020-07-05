const router = require("express").Router();
const config = require("../utils/config");
const videoToken = require("../utils/tokens");
const client = require("twilio");

const sendTokenResponse = (token_guest, token_host, res) => {
  res.set("Content-Type", "application/json");
  res.send(
    JSON.stringify({
      token_guest: token_guest.toJwt(),
      token_host: token_host.toJwt(),
    })
  );
};

router.route("/token").post((req, res) => {
  const name = req.body.name;
  const room = req.body.room;
  const host = req.body.host;
  const token_guest = videoToken(name, room, config);
  const token_host = videoToken(host, room, config);
  res.json({
    token_guest: token_guest.toJwt(),
    token_host: token_host.toJwt(),
  });
});

router.route("/meetings").get(async (req, res) => {
  let completed_rooms = [];
  const twilio = client(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
  await twilio.video.rooms
    .list({ status: "completed", limit: 20 })
    .then((rooms) =>
      rooms.forEach((r) => {
        completed_rooms.push({
          sid: r.sid,
          status: r.status,
          dateCreated: r.dateCreated,
          uniqueName: r.uniqueName,
          endTime: r.endTime,
          duration: r.duration,
        });
      })
    );
  res.json(completed_rooms);
});

module.exports = router;
