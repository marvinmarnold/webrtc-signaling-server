## Overview
A signaling server to connect two WebRTC clients. Intended to be used with [this client](https://github.com/marvinmarnold/webrtc-sample-app.)

## Usage
node index.js

## Implementation

- [x] Allow single incoming connection
- [x] Maintain state about all connected clients
- [x] Implement echoing from client A to client B

To open up port publicly: `iptables -I INPUT -p tcp --dport 7766 -j ACCEPT`