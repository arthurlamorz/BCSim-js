const net = require('net')
const random = require('random')

const prob = 493163

var bet = 1
var total = 100
const max = 8

function receiveData(data) {
  for (var i = 0; i < sockets.length; i++) {
    const rand = random.int(0, 1000000)
    const wl = rand < prob ? 'W' : 'L'

    if (wl == 'L')
    {
      total -= bet
      bet = 1
    }
    else {
      total += bet
      bet = bet * 2 + 1

      if (bet > max) 
        bet = 1
    }
    
    sockets[i].write('|' + rand + '|' + wl + '|' + total + '|'); 

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