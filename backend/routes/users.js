const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
let crypto = require("crypto");
const jwt = require("jsonwebtoken");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const User = require("../models/user");

// TODO: Mailer func needed
router.post("/forgotPassword", (req, res, next) => {
  if (req.body.email === "") {
    return res.status(404).json({ email: "E-posta geçersiz" });
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      return res.status(404).json({ emailnotfound: "E-posta bulunamadı" });
    } else {
      const token = crypto.randomBytes(20).toString("hex");
      User.findOneAndUpdate(
        { email: req.body.email },
        {
          $set: {
            resetPasswordToken: token,
            resetPasswordExpires: Date.now() + 86400000, // 1 day in milliseconds
          },
        }
      )
        .then((req) => res.json("recovery email sent"))
        .catch((err) => res.status(400).json("Error: " + err));
    }
  });
});

// TODO: Check password quality
router.post("/resetPassword", (req, res, next) => {
  if (req.body.token === "") {
    return res
      .status(404)
      .json({ token: "Şifre sıfırlama bağlantısı geçersizdir." });
  }

  User.findOne({ resetPasswordToken: req.body.token }).then((user) => {
    if (!user) {
      return res
        .status(404)
        .json({ token: "Şifre sıfırlama bağlantısı geçersizdir." });
    } else {
      bcrypt
        .genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            user
              .update({
                password: hash,
                resetPasswordToken: null,
                resetPasswordExpires: null,
              })
              .then(() => {
                res.status(200).send({ message: "password updated" });
              });
          });
        })
        .then((req) => res.json("password changed"))
        .catch((err) => res.status(400).json("Error: " + err));
    }
  });
});

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res
        .status(400)
        .json({ email: "E-posta adresi daha önceden alınmıştır" });
    } else {
      const newUser = new User({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: req.body.password,
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ emailnotfound: "E-posta bulunamadı" });
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
          surname: user.surname,
          role: user.role,
          room: user.room ? user.room : "",
        };
        jwt.sign(
          payload,
          "secret",
          {
            expiresIn: 31556926,
          },
          (err, token) => {
            if (err) console.error("There is some error in token", err);
            else {
              res.json({
                success: true,
                token: `Bearer ${token}`,
              });
            }
          }
        );
      } else {
        return res.status(400).json({ passwordincorrect: "Hatalı Şifre" });
      }
    });
  });
});

module.exports = router;
