const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
// mangoDB
const { MongoClient } = require('mongodb');
const uri = "mongodb://0.0.0.0:27017"; 
const client = new MongoClient(uri);


const app = express();
const PORT = process.env.PORT || 5000;


// texting with socket.io
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

let messages = [];

io.on('connection', async (socket) => {
  console.log('New client connected. Socket ID:', socket.id);

  const messagesCollection = client.db("message").collection("messages");
  console.log("!!!");

  try {
    // Use await to fetch the messages as an array
    const messagesFromDb = await messagesCollection.find().toArray();
    console.log(messagesFromDb);

    // Emit the messages from the database
    socket.emit('loadMessages', messagesFromDb);
  } catch (err) {
    console.error('Error retrieving messages from MongoDB', err);
    // Emit an error event to the client if you want to handle this on the client-side
    socket.emit('errorLoadingMessages', 'Unable to load messages');
  }

  socket.on('sendMessage', async (messages) => {
    try {
      const result = await messagesCollection.insertOne(messages);
      if (result.acknowledged) {
        console.log(`Message saved to MongoDB`, messages);
        // Emit the message to all clients, including the sender
        io.emit('messageReceived', messages);
      }
    } catch (error) {
      console.error('Error saving message to MongoDB', error);
    }
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected. Socket ID:`, socket.id);
  });
});


// store the uploaded file
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
  res.json({ message: 'from the server!!!!' });
}); 

app.get('/file-count', (req, res) => {
    const savedDir = path.join(__dirname, 'saved', 'pdf');
    
    fs.readdir(savedDir, (err, files) => {
        if (err) {
            return res.status(500).json({ message: "Error reading directory" });
        }

        // Filter out directories and count only PDF files
        let fileCount = files.filter(file => file.endsWith('.pdf')).length;
        res.json({ fileCount });
        // console.log("Here is the file count: ", fileCount);
    });
});

app.post('/upload', upload.single('file'), (req, res) => {
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

app.delete('/delete/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, 'saved/pdf', fileName);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ message: "File not found" });
    }

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error deleting file" });
      }
      res.json({ message: "File deleted successfully" });
    });
  });
});
// mongo db
server.listen(PORT, '0.0.0.0', async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    console.log(`WebSocket and HTTP server is running on port ${PORT}`);
  } catch (error) {
    console.error('Unable to connect to MongoDB', error);
    process.exit(1);
  }
});


