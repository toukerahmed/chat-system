const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Store messages
const messages = [];

// Map socket.id -> username
const users = {};

io.on('connection', (socket) => {
  // Username is sent from client (persistent)
  socket.on('register', (username) => {
    users[socket.id] = username || `User-${socket.id.slice(0,4)}`;

    console.log(`New client connected: ${users[socket.id]}`);

    // Send chat history
    socket.emit('chat history', messages);

    // Notify others
    io.emit('system', `${users[socket.id]} joined the chat`);
  });

  // Chat message
  socket.on('chat message', (msg) => {
    const data = {
      id: socket.id,
      user: users[socket.id],
      text: String(msg).slice(0, 2000),
      ts: Date.now(),
      msgId: uuidv4()
    };
    messages.push(data);
    if (messages.length > 200) messages.shift();
    io.emit('chat message', data);
  });

  // Delete message
  socket.on('delete message', (msgId) => {
    const index = messages.findIndex(m => m.msgId === msgId && m.id === socket.id);
    if (index !== -1) {
      messages.splice(index, 1);
      io.emit('delete message', msgId);
    }
  });

  // Disconnect
  socket.on('disconnect', () => {
    if (users[socket.id]) {
      io.emit('system', `${users[socket.id]} left the chat`);
      delete users[socket.id];
    }
  });
});

const PORT = process.env.PORT || 3000;
const HOST = '10.19.58.62'; // your LAN IP

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});