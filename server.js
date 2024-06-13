require('dotenv').config()

const express = require('express');
const app = express();

const stripe = require('stripe')(process.env.STRIPE_TEST_SECRET_KEY)

const stripeAccountRoute = require('./routes/stripeAccount');
app.use('/stripeAccount', stripeAccountRoute);

app.listen(
    3000,
    () => console.log(`Live on ${process.env.SERVER_URL}`)
)


