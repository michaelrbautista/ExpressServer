require('dotenv').config()

const express = require('express');
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const bodyParser = require('body-parser');
router.use(bodyParser.json());

var stripeSecretKey;
if (process.env.NODE_ENV === 'production') {
    stripeSecretKey = process.env.STRIPE_LIVE_SECRET_KEY;
} else {
    stripeSecretKey = process.env.STRIPE_TEST_SECRET_KEY;
}

const stripe = require('stripe')(stripeSecretKey);

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
