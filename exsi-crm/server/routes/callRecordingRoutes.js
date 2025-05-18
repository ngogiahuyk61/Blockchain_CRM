const express = require("express");
const router = express.Router();
const { createCallRecording, getAllRecordings } = require("../controllers/callRecordingController");

router.post("/", createCallRecording);
router.get("/", getAllRecordings);

module.exports = router;
