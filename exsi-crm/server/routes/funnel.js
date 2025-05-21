// routes/funnel.js
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const funnelData = await getFunnelData();
  res.json(funnelData);
});

module.exports = router;
