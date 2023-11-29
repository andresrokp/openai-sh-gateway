const express = require('express');
const router = express.Router();
// an upload handler middleware. Is the executed form of the library;
const upload = require('multer')();
// to handle file system
const fs = require('fs');

router.post('/audiorequest', upload.single('audioFile') , (req, res) => {
  // extract middleware result
  const audioFileBuffer = req.file.buffer;
  // save as file in folder
  fs.writeFile('./src/others/dummyFiles/requestAudioFile.wav', audioFileBuffer, (err) => {
    if (err) {
        console.error('Error saving audio file :( \n', err);
        res.status(500).json({ error: 'Internal Server Error :(' });
    } else {
        console.log('Audio file saved successfully :)');
    }
  });

  // Handle income data and build a prompt
  console.log(audioFileBuffer);
  // Send a query to OpenAI
  
  // Return the response
  res.json({ backAns: audioFileBuffer });
});

module.exports = router;