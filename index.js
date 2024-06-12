require('dotenv').config()

const express = require('express');
const app = express();

const stripe = require('stripe')(process.env.STRIPE_TEST_SECRET_KEY)

app.listen(
    3000,
    () => console.log(`Alive on http://localhost:3000`)
)


