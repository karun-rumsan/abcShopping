const functions = require("firebase-functions");
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const express = require("express");
const cors = require("cors");
const { response } = require("express");
const stripe = require("stripe")(
  "sk_test_51HxVV4FuHBQTFkUa4xgrJlkEMwxoDDWDlm9ppFQfHr5PmFAGqmAgugtBwOo9at95PjPIzsvdmifLto0lpoCpQ1nY0002Mc3odk"
);

//API
//api config
const app = express();

//Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

//api routes
app.get("/", (req, res) => res.send("Hello World!"));
app.post("/payments/create", async (req, res) => {
  const total = req.query.total; // for query param after the  (?) in front end to be connected to backend

  console.log("PAyment Request >>", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

//listen command
exports.api = functions.https.onRequest(app);
