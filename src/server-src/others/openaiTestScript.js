const OpenAI = require('openai').OpenAI;
require("dotenv").config();
const fs = require('fs')

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

const empresa = 'Avianca'

const captura = {
  "person": 36,
  "suitcase": 20
}

const umbral = 30;

const muyLleno = captura.person > umbral;

const data = {captura, empresa, umbral, muyLleno}

async function chat() {
  console.log('Requesting chat completion...');
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content:
          `Reporta muy conciso en una sola frase simple en lenguaje natural el estado registrado de la fila del counter:  ${JSON.stringify(data)}`,
      },
    ],
    model: "gpt-3.5-turbo",
    max_tokens: 50
  });

  console.log(completion.choices[0]);
}

async function audio(){
  const content = `Of course, here's an extensive summary of the conversation:

  The user initially asked for help designing a backend (Backend 2) that securely handles client requests with JWT tokens, interacts with an existing API (OpenAI), and how to structure this backend effectively.
  
  The user subsequently requested help setting up a "Hello World" Node.js server using TypeScript.
  
  Next, he provided a set of instructions to implement an Express server that redirects requests to the OpenAI API, validates JWT tokens, and handles data for queries to OpenAI GPT-3.5 Turbo models. Emphasis was placed on project organization best practices.
  
  The user then requested the execution of these instructions to build the backend. Specific instructions were provided and the importance of code organization for scalability was emphasized.
  
  He changed the subject and asked for a script to send audio from a microphone to the OpenAI Whisper API in Node.js, using Ubuntu within Windows Subsystem for Linux 2 (WSL 2).
  
  The obsolescence of "node-record-lpcm16" was discussed and it was recommended to look for alternatives.
  
  The user then requested help configuring a server to serve an HTML page and an issue with static route configuration was resolved.
  
  The topic was changed again to address the client side of the application, and a detailed plan was presented involving voice recording, audio compression, interaction with the OpenAI Whisper API, and playback of audio and text responses.
  
  Code snippets were provided to process audio on the server, send it to OpenAI Whisper, get a response, and play it on the client.
  
  The user expressed concern about whether the approach of saving and then playing the audio on the server is scalable.
  
  Discussed an issue with setting the Permissions Policy on an iframe and how to resolve it.
  
  Finally, a microphone issue in an iframe on a third-party site was addressed, and it was recommended to contact the site owner and consider issues related to HTTPS and embedding policies.
  
  Overall, the conversation covered a wide range of topics, from backend design to interacting with AI APIs, audio issues, server configuration, and challenges when working with iframes on third-party sites.`
  
  console.log('Requesting audio transcription...');
  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "nova",
    input: content,
  });
  console.log('Saving audio file...');
  const mp3Buffer = Buffer.from(await mp3.arrayBuffer());
  await fs.writeFileSync('./src/others/dummyFiles/akapWhisper.mp3', mp3Buffer);
}


async function main() {
  const option = process.argv[2];
  console.log(option);
  switch (option) {
    case 'chat':
      await chat();
      break;
    case 'audio':
      await audio();
      break;
    default:
      break;
  }
}

main().then(()=>{console.log("\n\nProcess completed. :)");});