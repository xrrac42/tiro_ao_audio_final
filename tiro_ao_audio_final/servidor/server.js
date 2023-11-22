import {Router} from "express"
import fs from "fs-extra"
import { Readable } from "stream"

const router = Router()

router.get('/songs', async (req, res) => {
    const files = await fs.readdir("./servidor/musicas")
    res.json(files)
})

router.get('/stream/:name', async (req, res) => {
    const file = './servidor/musicas/' + req.params.name;
    
    const exists = await fs.pathExists(file)

    console.log("exists: " + exists)

    if (exists) {
        const stat = await fs.stat(file);
        const rstream = fs.createReadStream(file);

        res.writeHead(200, {
            'Content-Type': 'audio/wav',
            'Content-Length': stat.size,
        });

        rstream.pipe(res);
    }
    else {
        res.send('Error - 404');
        res.end();
    }
});


// router.get('/stream-audio/:name', (req, res) => {
//     // Caminho do arquivo de áudio (substitua pelo seu próprio caminho)
//     const filePath = './servidor/musicas/' + req.params.name;
  
//     // Configurar cabeçalhos para streaming de áudio
//     res.setHeader('Content-Type', 'audio/mpeg');
//     res.setHeader('Transfer-Encoding', 'chunked');
  
//     // Criar um stream legível (readable stream)
//     const audioStream = new Readable();
  
//     // Configurar a função de leitura do stream
//     audioStream._read = () => {};
  
//     // Ler o arquivo e emitir blocos a cada 5 segundos
//     const fileStream = fs.createReadStream(filePath);
//     fileStream.on('data', (chunk) => {
//       audioStream.push(chunk);
//     });
  
//     // Enviar blocos a cada 5 segundos
//     const interval = setInterval(() => {
//       const chunk = fileStream.read(5000);
//       if (chunk) {
//         audioStream.push(chunk);
//       } else {
//         clearInterval(interval);
//         audioStream.push(null); // Finalizar o stream quando o arquivo acabar
//       }
//     }, 5000);
  
//     // Transmitir o stream para o cliente
//     audioStream.pipe(res);
  
//     // Capturar evento de fechamento da conexão do cliente
//     req.on('close', () => {
//       clearInterval(interval);
//       audioStream.destroy();
//       fileStream.destroy();
//     });
//   });


// const express = require('express');
// const fs = require('fs');
// const path = require('path');

// const app = express();
// const port = 3000;

// app.get('/buffer', (req, res) => {
//     const filePath = path.join(__dirname, 'caminho/do/arquivo/musical.mp3');

//     // Substitua '44100' pela taxa de amostragem real da sua música
//     const sampleRate = 44100;
//     const duration = 5; // em segundos

//     const bufferSize = sampleRate * duration;

//     const buffer = Buffer.alloc(bufferSize);

//     // Lógica para preencher o buffer com dados da música
//     // Exemplo: leitura do arquivo musical e preenchimento do buffer

//     // Envie o buffer como resposta
//     res.send(buffer);
// });

// app.listen(port, () => {
//     console.log(`Servidor rodando em http://localhost:${port}`);
// });




export default router