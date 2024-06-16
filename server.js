require('dotenv').config()

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const stripeAccountRoute = require('./routes/account');
app.use('/account', stripeAccountRoute);

const stripePaymentRoute = require('./routes/payment');
app.use('/payment', stripePaymentRoute);

app.listen(
    3000,
    () => console.log(`Live on http://localhost:3000`)
)


