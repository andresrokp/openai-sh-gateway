require('dotenv').config();
const { log } = require('console');
const fs = require('fs');
const OpenAI = require('openai').OpenAI;
const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

log('Fetching transcript...')
openai.audio.transcriptions.create({
    file: fs.createReadStream('./src/dummyFiles/sampleAudio.mp3'),
    model: 'whisper-1'
  })
  .then((transcription)=>{
      log('Sample Audio transcript :) \n', transcription);
    });

