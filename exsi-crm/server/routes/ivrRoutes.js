const express = require("express");
const router = express.Router();

// Mock Data
let ivrs = [
  { id: 1, name: "Welcome Message", status: "Active" },
  { id: 2, name: "Support Line", status: "Inactive" },
];

router.get("/", (req, res) => {
  res.json(ivrs);
});

router.post("/", (req, res) => {
  const newIVR = {
    id: ivrs.length + 1,
    name: req.body.name,
    status: req.body.status,
  };
  ivrs.push(newIVR);
  res.json(newIVR);
});

module.exports = router;
