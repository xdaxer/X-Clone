import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const imagesFolder = path.join(__dirname, '../database/uploads/images/posts');

router.get('/images/posts/:postID', (req, res) => {
  const postID = req.params.postID;

  fs.readdir(imagesFolder, (err, files) => {
    if (err) {
      console.error('Klasör okunamadı:', err);
      return res.status(500).send('Sunucu hatası');
    }

     const foundFile = files.find(file => path.parse(file).name === postID);

    if (!foundFile) {
      return res.status(404).send('Dosya bulunamadı');
    }

    const filePath = path.join(imagesFolder, foundFile);
    res.sendFile(filePath);
  });


});



export default router;
