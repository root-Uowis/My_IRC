const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

const PORT = process.env.PORT || 9292;

io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if(error) return callback(error);

    socket.join(user.room);

    socket.emit('message', { user: 'Bot of '+`${user.room}`+'Server', text: `Hello ${user.name}, u are on ${user.room} Server 👋`});
    socket.broadcast.to(user.room).emit('message', { user: 'Bot of '+`${user.room}`+'Server', text: `Say Hi To ${user.name} 💗 !` });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on('usersCommand',(message ,callback) =>{
    console.log('mdr')
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { room: user.room, text: getUsersInRoom(user.room)});
    callback();

  })

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'Bot of '+`${user.room}`+'Server', text: `${user.name} has Dematerialized 🛸 ` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});

server.listen(PORT, () => console.log(`Server run on Port: `+ PORT));