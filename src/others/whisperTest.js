require('dotenv').config();
const { log } = require('console');
const fs = require('fs');
const OpenAI = require('openai').OpenAI;
const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

log('Fetching transcript...')
openai.audio.transcriptions.create({
    file: fs.createReadStream('./src/others/dummyFiles/sampleAudio.mp3'),
    model: 'whisper-1',
    prompt: 'Saludos. El siguiente es un discurso, a veces lento, a veces rápido, para ser transcrito...'
  })
  .then((transcription)=>{
      log('Sample Audio transcript :) \n', transcription);
    });

