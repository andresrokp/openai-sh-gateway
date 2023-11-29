require('dotenv').config();
const express = require('express');
const router = express.Router();
// an upload handler middleware. Is the executed form of the library;
const upload = require('multer')();
// to handle file system
const fs = require('fs');
// the all mighty power
const OpenAI = require('openai').OpenAI;
const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

router.post('/audiorequest', upload.single('audioFile') , async (req, res) => {
  // extract middleware result
  const audioFileBuffer = req.file.buffer;
  // save as file in folder
  fs.writeFileSync('./src/others/dummyFiles/requestAudioFile.wav', audioFileBuffer, (err) => {
    if (err) {
        console.error('Error saving audio file :( \n', err);
        res.status(500).json({ error: 'Internal Server Error :(' });
    } else {
        console.log('Audio file saved successfully :)');
      }
  });
  
  //TODO: pipeline this and avoid to use the dummy file
  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream('./src/others/dummyFiles/requestAudioFile.wav'),
    model: 'whisper-1',
  });

  console.log('Audio transcribed :) \n', transcription);
  res.json({backResponse: transcription})
});

module.exports = router;