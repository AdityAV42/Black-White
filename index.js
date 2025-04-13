//backend server
const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static('public'));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('photo'), async (req, res) => {
  try {
    const grayscaleBuffer = await sharp(req.file.buffer)
      .grayscale()
      .toBuffer();

    res.set('Content-Type', 'image/png');
    res.send(grayscaleBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).send('Image processing failed');
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
