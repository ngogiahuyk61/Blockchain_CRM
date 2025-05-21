// routes/customers.js
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const customers = await Customer.find();
  res.json(customers);
});

module.exports = router;
