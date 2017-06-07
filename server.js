const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io').listen(server);

server.lastPlayderID = 0;
server.playersList = [];

app.use('/css', express.static(__dirname + '/app/css'));
app.use('/js', express.static(__dirname + '/app/js'));
app.use('/img', express.static(__dirname + '/app/img'));
app.use('/tiles', express.static(__dirname + '/app/tiles'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/app/index.html');
});

server.listen(process.env.PORT || 8081, function () {
  console.log('Listening on ' + server.address().port);
});

io.on('connection', function (socket) {
  socket.on('newplayer', function () {
    socket.player = {
      id: server.lastPlayderID++,
      x: randomInt(100, 400),
      y: randomInt(100, 400)
    };
    socket.emit('allplayers', getAllPlayers());
    socket.broadcast.emit('newplayer', socket.player);

    console.log('heyyy')

    socket.on('moveplayer', function (data) {
      console.log('move to ' + data.x + ', ' + data.y);
      socket.player.x = data.x;
      socket.player.y = data.y;
      io.emit('move', socket.player);
    });

    socket.on('disconnect', function () {
      io.emit('remove', socket.player.id);
    });
  });
});

const getAllPlayers = () => {
  var players = [];

  Object.keys(io.sockets.connected).forEach(function (socketID) {
    var player = io.sockets.connected[socketID].player;
    if (player) players.push(player);
  });

  return players;
};

const randomInt = (low, high) => {
  return Math.floor(Math.random() * (high - low) + low);
};
