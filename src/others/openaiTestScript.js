import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

const empresa = 'Avianca'

const captura = {
  "person": 36,
  "suitcase": 20
}

const umbral = 30;

const muyLleno = captura.person > umbral;

const data = {captura, empresa, umbral, muyLleno}

async function main() {
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

main();
