const nodemailer = require("nodemailer");

const sendMail = async ({ to, purpose }) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "concepcion.hills@ethereal.email",
      pass: "kwfes28PXYXM6NZFPu",
    },
  });

  const from = "info@sigortestrade.com";
  let text;
  let subject;

  switch (purpose) {
    case "forgotPassword":
      text = "<h1>Sigortes.com</h1><h2>Şifre Sıfırlama</h2>";
      subject = "Şifre Sıfırlama Bağlantısı";
      break;
    case "newUser":
      text = "<h1>Sigortes.com'a Hoşgeldiniz</h1>";
      subject = "Sigortes.com'a hoşgeldiniz";
      break;
    default:
      text = "";
  }

  let info = await transporter.sendMail({
    from,
    to,
    subject,
    text,
  });

  console.log(`Preview: ${nodemailer.getTestMessageUrl(info)}`);
};

module.exports = sendMail;
