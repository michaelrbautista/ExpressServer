const express = require('express');
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const bodyParser = require('body-parser');
router.use(bodyParser.json());

const stripe = require('stripe')('sk_test_51P3659KRUtiKYn5d3lm7pT9qcMjrIIEVIOI7oeiLeHoo60pQJOxNo9PEjlsMvxBaYLtqXLQSoWZN577CcBw2cO2T00aheP8Me9')

// Create stripe account
router.post("/paymentSheet", async function(req, res) {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: 'usd',
            application_fee_amount: req.body.amount * 0.05,
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
