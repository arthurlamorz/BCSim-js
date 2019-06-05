const net = require('net')
const random = require('random')

const prob = 493163



function receiveData(data) {
  for (var i = 0; i < sockets.length; i++) {
    const rand = random.int(0, 1000000)
    const wl = rand < prob ? 'W' : 'L'
    sockets[i].write('|' + rand + '|' + wl + '|');

  }
}

const sockets = []

const server = net.createServer(function (socket) {
  sockets.push(socket);
  socket.write('Welcome to the Telnet server!\n');
  socket.on('data', function (data) {
    receiveData(data);
  })
})

server.listen(8888)