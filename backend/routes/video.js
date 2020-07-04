const router = require("express").Router();
const config = require("../utils/config");
const videoToken = require("../utils/tokens");

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

module.exports = router;
