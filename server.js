const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http'); // 1. Add this
const { Server } = require('socket.io'); // 2. Add this

const app = express();
app.use(express.json());
app.use(cors());

// Serve your music
app.use('/static-music', express.static(path.join(__dirname, 'music')));

// 3. Create the Server
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" } // Allow your Vite app
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // When someone clicks play
  socket.on('command-play', () => {
    io.emit('sync-play'); // Tell EVERYONE to play
  });

  // When someone clicks pause
  socket.on('command-pause', () => {
    io.emit('sync-pause'); // Tell EVERYONE to pause
  });
});

app.get('/test', (req,res) => {res.send("-- msg from backend--")})


// 4. Use server.listen instead of app.listen
server.listen(3001, () => console.log("listening on port 3001"));