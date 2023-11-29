const express = require('express');
const router = express.Router();
// an upload handler middleware. Is the executed form of the library;
const upload = require('multer')();

router.post('/audiorequest', upload.single('audioFile') , (req, res) => {
  const audioFileBuffer = req.file.buffer;
  // Handle income data and build a prompt
  console.log(audioFileBuffer);
  // Send a query to OpenAI
  
  // Return the response
  res.json({ backAns: audioFileBuffer });
});

module.exports = router;