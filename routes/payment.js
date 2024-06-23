const express = require('express');
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const bodyParser = require('body-parser');
router.use(bodyParser.json());
const stripeSecretKey = process.env.STRIPE_LIVE_SECRET_KEY

const stripe = require('stripe')(stripeSecretKey);

// Create stripe account
router.post("/paymentSheet", async function(req, res) {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: 'usd',
            application_fee_amount: req.body.amount * 0.1 < .50 ? .50 : req.body.amount * 0.1,
            transfer_data: {
              destination: req.body.destinationAccountId,
            },
          });
        
          res.json({
            paymentIntent: paymentIntent.client_secret,
            publishableKey: 'pk_test_51P3659KRUtiKYn5dqjDEIBTZQSxzvgLXlLwwP7qNzoBCvHt9fONoV1N6nLwkSDD5bGmfT1NyuWrIkd7yAhkLQpvS00ZY9EsKzQ'
          });
    } catch (e) {
        throw new Error(e);
    }
})

module.exports = router;
