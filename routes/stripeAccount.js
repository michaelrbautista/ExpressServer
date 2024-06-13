const express = require('express');
const router = express.Router();

router.post("/", (req, res) => {
    // Get all accounts
    res.send({ data: "Get all accounts" })
})

module.exports = router;
