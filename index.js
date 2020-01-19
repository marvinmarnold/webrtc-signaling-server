const WebSocket = require('ws');

const port = 7766



const http2 = require('http2');
 
// const server = http2.createServer();
 
console.log("Starting websocket on port " + port)
// const wss = new WebSocket.Server({ server });
const wss = new WebSocket.Server({ port: port });

let numClients = 0

// Is the client ready but not the same instance as ws (self)
const isReadyClientNotSelf = (client, ws) => {
  return (client !== ws) && (client.readyState === WebSocket.OPEN)
}

const sendNumClients = ws => {
  console.log("Notifying self about number of peers")
  ws.send("N:" + numClients)
  // wss.clients.forEach(client => {
  //   if (isReadyClientNotSelf(client, ws))
  //     client.send("N:" + numClients)
  // })
}

const echoMsg = (msg, ws) => {
  console.log("Forwarding message to all clients except self")
  wss.clients.forEach(client => {
    if (isReadyClientNotSelf(client, ws)) {
      console.log("sending msg to other")
      client.send(msg)
    } else {
      console.log("not sending msg to self")
    }
  })
}

/*
  Keep track of number of connected clients and send to clients
*/
wss.on('connection', function connection(ws, req) {
  console.log("Got a connection over the websocket")

  numClients += 1

  console.log("New client connected. Num connected clients: " + numClients)
  // This will trigger the client to create an offer
  // Only support two peers right now. For simplicity, this will cause the newest client to create the initial offer.
  sendNumClients(ws)
  
  ws.on('message', function incoming(message) {
    echoMsg(message, ws)
  })

  ws.on('close', function close() {
    console.log("A client disconnected")
    numClients -= 1
    sendNumClients(ws)
  })

});

// server.listen(port);
