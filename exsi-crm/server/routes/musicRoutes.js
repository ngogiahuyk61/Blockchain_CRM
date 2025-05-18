const express = require("express");
const router = express.Router();

// Mock Data
let musicTracks = [
  { id: 1, name: "Track 1", duration: "2:30" },
  { id: 2, name: "Track 2", duration: "3:00" },
];

router.get("/", (req, res) => {
  res.json(musicTracks);
});

router.post("/", (req, res) => {
  const newTrack = {
    id: musicTracks.length + 1,
    name: req.body.name,
    duration: req.body.duration,
  };
  musicTracks.push(newTrack);
  res.json(newTrack);
});

module.exports = router;
