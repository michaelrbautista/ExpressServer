const express = require('express');
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const bodyParser = require('body-parser');
router.use(bodyParser.json());

const stripe = require('stripe')('sk_test_51P3659KRUtiKYn5d3lm7pT9qcMjrIIEVIOI7oeiLeHoo60pQJOxNo9PEjlsMvxBaYLtqXLQSoWZN577CcBw2cO2T00aheP8Me9')

// Create stripe account
router.post("/create", async function(req, res) {
    try {
        const account = await stripe.accounts.create({
             type: 'standard',
             business_profile: {
                mcc: 5815
             }
        });

        res.send(account);
    } catch (e) {
        throw new Error(e);
    }
})

// Create stripe account link
router.post("/accountLink", async function (req, res) {
    try {
        const accountLink = await stripe.accountLinks.create({
            account: req.body.stripeAccountId,
            refresh_url: 'https://michaelrbautista.github.io/stripeurl/',
            return_url: 'https://michaelrbautista.github.io/stripeurl/',
            type: 'account_onboarding',
            collection_options: {
              fields: 'eventually_due',
            },
          });

        res.send(accountLink);
    } catch (e) {
        throw new Error(e);
    }
})

// Get stripe account
router.get("/:stripeAccountId", async function (req, res) {
    try {
        const account = await stripe.accounts.retrieve(req.query.stripeAccountId);

        res.send(account);
    } catch (e) {
        throw new Error(e);
    }
})

module.exports = router;
