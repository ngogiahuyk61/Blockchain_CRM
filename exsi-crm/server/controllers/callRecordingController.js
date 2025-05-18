const CallRecording = require("../models/CallRecording");

// Tạo Call Recording
exports.createCallRecording = async (req, res) => {
  try {
    const newRecording = new CallRecording(req.body);
    await newRecording.save();
    res.status(201).json(newRecording);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lấy tất cả các bản ghi
exports.getAllRecordings = async (req, res) => {
  try {
    const recordings = await CallRecording.find();
    res.json(recordings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
