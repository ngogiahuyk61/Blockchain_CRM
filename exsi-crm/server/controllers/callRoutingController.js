    const CallRouting = require("../models/CallRouting");

// Tạo rule call routing
exports.createCallRouting = async (req, res) => {
  try {
    const newRouting = new CallRouting(req.body);
    await newRouting.save();
    res.status(201).json(newRouting);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lấy tất cả các rules
exports.getAllRoutingRules = async (req, res) => {
  try {
    const rules = await CallRouting.find();
    res.json(rules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
