import { Router } from "express";
import fs from "fs-extra";
import {getAudioDurationInSeconds} from 'get-audio-duration';


const router = Router();

router.get("/songs", async (req, res) => {
  const files = await fs.readdir("./servidor/musicas");
  res.json(files);
});

router.get('/stream/:name', async (req, res) => {
    const file = './servidor/musicas/' + req.params.name;

    const exists = await fs.pathExists(file)

    if (!exists) {
        return res.status(404).send("Arquivo não encontrado");
    }

    const stat = await fs.stat(file);
    const audioDuration = await getAudioDurationInSeconds(file)
    const bytesPerSecond = Math.floor(stat.size / audioDuration)
    const rstream = fs.createReadStream(file, { highWaterMark: 5*bytesPerSecond });

    res.writeHead(200, {
        'Content-Type': 'audio/wav',
        'Content-Length': stat.size,
    });

    rstream.pipe(res);
    
});


export default router;