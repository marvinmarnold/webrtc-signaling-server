const WebSocket = require('ws');

const port = 7766

console.log("Starting websocket on port " + port)
const wss = new WebSocket.Server({ port: port });

let numClients = 0

const sendNumClients = () => {
  console.log("Notifying clients about peers")
  wss.clients.forEach(client => {
    if (client !== wss && client.readyState === WebSocket.OPEN)
      client.send(numClients)
  })
}

/*
  Keep track of number of connected clients and send to clients
*/
wss.on('connection', function connection(ws, req) {
  console.log("Got a connection over the websocket")
  numClients += 1

  console.log("New client connected. Num connected clients: " + numClients)
  sendNumClients()
  
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  })

  ws.on('close', function close() {
    console.log("A client disconnected")
    numClients -= 1
    sendNumClients()
  })

});