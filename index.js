const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 7766 });

wss.on('connection', function connection(ws) {
  console.log("Got a connection over the websocket")
  
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
});