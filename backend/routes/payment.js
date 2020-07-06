const express = require("express");
const router = express.Router();
var Iyzipay = require("iyzipay");

router.post("/test", (req, res) => {
  var iyzipay = new Iyzipay();

  const price = req.body.price;
  const cardNumber = req.body.number;
  const cardMonth = req.body.expiry.split("/")[0];
  const cardYear = req.body.expiry.split("/")[1];
  const cardCvc = req.body.cvc;
  const cardHolderName = req.body.name;

  var request = {
    conversationId: "123456789", // OPTIONAL: Make it dynamic
    price: price,
    paidPrice: price,
    currency: Iyzipay.CURRENCY.TRY,
    installment: "1",
    paymentCard: {
      cardHolderName: cardHolderName,
      cardNumber: cardNumber,
      expireMonth: cardMonth,
      expireYear: cardYear,
      cvc: cardCvc,
      registerCard: "0",
    },
    buyer: {
      id: "BY789", // REQUIRED: Make it dynamic
      name: "Berke", // REQUIRED: Make it dynamic
      surname: "Ozelsel", // REQUIRED: Make it dynamic
      gsmNumber: "+905350000000", // OPTIONAL: Make it dynamic
      email: "email@email.com", // REQUIRED: Make it dynamic
      identityNumber: "74300864791", // REQUIRED: Make it dynamic
      lastLoginDate: "2015-10-05 12:43:35", // OPTIONAL
      registrationDate: "2013-04-21 15:12:09", // OPTIONAL
      registrationAddress: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1", // REQUIRED: Make it dynamic
      ip: "85.34.78.112", // REQUIRED: Make it dynamic
      city: "Istanbul", // REQUIRED: Make it dynamic
      country: "Turkey", // REQUIRED: Make it dynamic
      zipCode: "34732", // OPTIONAL
    },
    shippingAddress: {
      contactName: "Jane Doe", // REQUIRED: Make it dynamic
      city: "Istanbul", // REQUIRED: Make it dynamic
      country: "Turkey", // REQUIRED: Make it dynamic
      address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1", // REQUIRED: Make it dynamic
      zipCode: "34742", // OPTIONAL
    },
    billingAddress: {
      contactName: "Jane Doe", // REQUIRED: Make it dynamic
      city: "Istanbul", // REQUIRED: Make it dynamic
      country: "Turkey", // REQUIRED: Make it dynamic
      address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1", // REQUIRED: Make it dynamic
      zipCode: "34742", // OPTIONAL
    },
    basketItems: [
      {
        id: "BI101", // REQUIRED: Make it dynamic
        name: "Binocular", // REQUIRED: Make it dynamic
        category1: "Collectibles", // REQUIRED: Make it dynamic
        category2: "Accessories", // OPTIONAL
        itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL, // REQUIRED: Make it dynamic
        price: price, // REQUIRED: Make it dynamic
      },
    ],
  };

  iyzipay.payment.create(request, function (err, result) {
    res.json(result);
  });
});

module.exports = router;
