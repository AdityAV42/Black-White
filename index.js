//backend server
const express = require('express');
const multer = require('multer');     //file uploads
const sharp = require('sharp');       //image processing  --> to convert the uploaded image to grayscale
const cors = require('cors');        //middleware - Allows Cross-Origin Resource Sharing requests (enables frontend to talk to backend even if hosted on a different domain)
const path = require('path');        //file path handling 
const fs = require('fs');            //filesystem access

const app = express();
const PORT = 3000;

app.use(cors());                      //Enables CORS--so your frontend (hosted on a different server like localhost:5500 or EC2 public IP) can make requests to this backend.
app.use(express.static('public'));    // serves static files from the public folder (not used here, but good practice)

const storage = multer.memoryStorage();       //store uploaded files on RAM(memory) as buffers (not as physical files on disk)
const upload = multer({ storage: storage });  // Initializes Multer with memory storage.

app.post('/upload', upload.single('photo'), async (req, res) => {
  try {
    const grayscaleBuffer = await sharp(req.file.buffer)
      .grayscale()
      .toBuffer();          //Return the processed image as a buffer.

    res.set('Content-Type', 'image/png');       //Sets the response type to PNG
    res.send(grayscaleBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).send('Image processing failed');      //500 Internal Server Error
  }
});

//Starts the server, listening on all network interfaces (0.0.0.0)
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
