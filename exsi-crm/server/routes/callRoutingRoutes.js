const express = require("express");
const router = express.Router();
const { createCallRouting, getAllRoutingRules } = require("../controllers/callRoutingController");

router.post("/", createCallRouting);
router.get("/", getAllRoutingRules);

module.exports = router;
