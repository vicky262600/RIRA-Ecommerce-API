const router = require("express").Router();
// // const stripe = require("stripe")(process.env.STRIPE_KEY);
// const KEY = process.env.STRIPE_KEY;
// const stripe = require("stripe")(KEY);

// router.post("/payment", (req, res) => {
//   stripe.charges.create(
//     {
//       source: req.body.tokenId,
//       amount: req.body.amount,
//       currency: "usd",
//     },
//     (stripeErr, stripeRes) => {
//       if (stripeErr) {
//         res.status(500).json(stripeErr);
//       } else {
//         res.status(200).json(stripeRes);
//       }
//     }
//   );
// });

// module.exports = router;

const express = require("express");
const app = express();
// This is your test secret API key.
const stripe = require("stripe")('sk_test_51Oqnpp053ZU4Tjq4NgGPVWvanQJcrXQtRM7DkdJaGXChJKSyNslDGWgXI0Xbgn25mqwmzxBGJQyIONJ1bXSexG2700hECLZdvO');

app.use(express.static("public"));
app.use(express.json());

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

router.post("/payment", async (req, res) => {
  const { items } = req.body;
  
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "cad",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });
  
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

module.exports = router;
