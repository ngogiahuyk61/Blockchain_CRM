// routes/stats.js
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  // Giả sử có các hàm getActiveCalls và getOnlineAgents
  const activeCalls = await getActiveCalls();
  const onlineAgents = await getOnlineAgents();
  res.json({ activeCalls, onlineAgents });
});

module.exports = router;
