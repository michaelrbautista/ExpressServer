require('dotenv').config()

const express = require('express');
const app = express();

const stripeAccountRoute = require('./routes/stripeAccount');
app.use('/stripeAccount', stripeAccountRoute);

app.listen(
    3000,
    () => console.log(`Live on http://localhost:3000`)
)


