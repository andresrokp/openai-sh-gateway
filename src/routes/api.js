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
  fs.writeFileSync('./src/others/dummyFiles/requestAudioFile.mp3', audioFileBuffer, (err) => {
    if (err) {
        console.error('Error saving audio file :( \n', err);
        res.status(500).json({ error: 'Internal Server Error :(' });
    } else {
        console.log('Audio file saved successfully :)');
      }
  });
  
  //TODO!: pipeline this and avoid to use the dummy file
  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream('./src/others/dummyFiles/requestAudioFile.mp3'),
    model: 'whisper-1',
  });

  const content = airportTextCorpus + transcription.text;
  console.log('content >> ',content);
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content,
      },
    ],
    model: "gpt-3.5-turbo"
  });

  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "nova",
    input: completion.choices[0].message.content,
  });
  const mp3Buffer = Buffer.from(await mp3.arrayBuffer());
  await fs.writeFileSync('./src/others/dummyFiles/responseAudioFile.mp3', mp3Buffer);

  console.log('Request Audio transcript :) \n', transcription);
  console.log('Assistant Response :) \n', completion.choices[0].message.content);
  res.json({'pregunta':transcription.text, 'respuestaTxt':completion.choices[0].message.content, 'respuestaAudio':mp3Buffer})
});

module.exports = router;




const airportTextCorpus = `Eres un asistente útil. Actúa. Me vas a responder una pregunta basada en esta información o en información parecida. Si no tienes la respuesta te la inventas, es para un prototipo de servicio al usuario cliente. Si tienes la respuesta, tambien puedes inventar para hacerlo más interesante. Responde amable, informativo y muy corto:

Información Interna del Aeropuerto:

Terminales:
El Aeropuerto cuenta con dos terminales: Terminal Norte y Terminal Sur.
La Terminal Norte se especializa en vuelos nacionales
Terminal Sur se dedica a vuelos internacionales.

Gates:
Cada terminal tiene numerados sus gates de manera secuencial. 
En la Terminal Norte, los gates van del N1 al N20.

Salas de Espera:
Ambas terminales cuentan con amplias salas de espera equipadas con asientos cómodos y estaciones de carga para dispositivos electrónicos.

Oficinas de Aerolíneas:
Las oficinas de las aerolíneas están ubicadas en un sector exclusivo en cada terminal.
La oficina de Avianca se encuentra en la Terminal Norte, cerca del N15.

Restaurantes:
En la Terminal Norte, destacan restaurantes como "Sky Bites" y "Café Aéreo"
En la Terminal Sur, puedes encontrar "Gastronomía Global" y "Sabor Internacional".

Baños:
Los baños están distribuidos estratégicamente cerca de las áreas de mayor concurrencia.
Terminal Norte: Baños cerca de los gates N10 y N18.

Escaleras y Ascensores:
Para acceder a las salas de espera superiores, hay escaleras mecánicas y ascensores ubicados junto a los gates N5 y N12.

Información de Transporte del Aeropuerto :

Taxis:
La parada de taxis se encuentra frente a la entrada principal de la Terminal Norte.
El costo promedio del taxi al centro de la ciudad va desde $25 a $45
El tiempo de viaje va desde 20 minutos hasta 45 minutos.

Buses Urbanos:
La parada de buses urbanos está ubicada cerca de la Terminal Sur.
Los buses hacia el centro de la ciudad salen cada 20 minutos
El boleto tiene un costo de $2.

Estacionamiento:
El estacionamiento de corta estancia está situado junto a la Terminal Norte
El estacionamiento de larga estancia se encuentra cerca de la Terminal Sur
Las tarifas del estacionamiento varían según la duración de la estadía.

Recogida en la Ciudad:
Los familiares y amigos pueden recoger a los pasajeros en una zona designada frente a la Terminal Norte, cerca del N3.
Se recomienda llegar 30 minutos antes de la llegada del vuelo.

Tiempo de Recorrido:
El Tiempo de Recorrido en bus puede variar entre 30 y 50 minutos, dependiendo del tráfico.

Frecuencia de Buses:
Los buses urbanos hacia el centro de la ciudad tienen una frecuencia de paso de 20 minutos durante las horas pico y 30 minutos en horas de menor demanda.

Consejos Generales:
Se recomienda llegar al menos 1 hora antes del vuelo para realizar los trámites de seguridad y check-in.
En caso de necesitar asistencia adicional, hay mostradores de información en ambas terminales, cerca de las entradas principales.
Los horarios de vuelo y la disponibilidad de servicios pueden cambiar, se sugiere verificar la información en línea o con la aerolínea correspondiente.

Pregunta, duda o deseo del usuario para responder: `