const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dest = './saved/'; // Set default destination

    if (file.mimetype === 'application/pdf') {
      dest = './saved/pdf/';
    } else if (file.mimetype.startsWith('image/')) {
      // This will cover MIME types like image/png, image/jpeg, image/gif, etc.
      dest = './saved/pics/';
    }
    // Set the destination directory based on whether it's an image
    fs.mkdirSync(dest, { recursive: true });
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});


const upload = multer({ storage: storage });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/saved/pdf', express.static(path.join(__dirname, 'saved/pdf')));



app.get('/', (req, res) => {
  res.json({ message: 'from the server!' });
}); 

app.get('/file-count', (req, res) => {
    const savedDir = path.join(__dirname, 'saved');
    fs.readdir(savedDir, (err, files) => {
        if (err) {
            return res.status(500).json({ message: "Error reading directory" });
        }

        const fileCount = files.length;
        console.log("here is the filect: ", fileCount)
        res.json({ fileCount });
    });
});
app.post('/upload', upload.single('file'), (req, res) => {
    // You can now check req.file to see where it was saved, etc.
    // If it was an image, it should be in the ./saved/pic/ directory
    const isImage = req.file.mimetype.startsWith('image/');
    const savedDir = isImage ? path.join(__dirname, 'saved/pic') : path.join(__dirname, 'saved');

    fs.readdir(savedDir, (err, files) => {
        if (err) {
            return res.status(500).json({ message: "Error reading directory" });
        }
        
        const fileCount = files.length;
        res.json({ message: "File uploaded successfully", isImage, fileCount });
    });
});

// List all PDF files
app.get('/pdf-list', (req, res) => {

    const pdfDir = path.join(__dirname, 'saved', 'pdf');
    fs.readdir(pdfDir, (err, files) => {
        if (err) {
            return res.status(500).json({ message: "Error reading directory" });
        }

        // Filter for PDF files
        const pdfFiles = files.filter(file => file.endsWith('.pdf'));


        res.json({ pdfFiles });
    });
});


app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});


