//Initialize the express 'app' object
let express = require('express');
let app = express();
app.use('/', express.static('public'));

//Initialize the actual HTTP server
let http = require('http');
let server = http.createServer(app);
let port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log('server listening at port: http://localhost:' + port);
  });

//Initialize socket
let { Server } = require('socket.io');
let io = new Server(server);

//Listen for individual clients/users to connect
io.on('connection', (socket) => {
    console.log('user ' + socket.id + ' has connected');

    //Listen for a message named 'msg' from this client
    socket.on('msg', (data)=> {
      //Data can be numbers, strings, object
      console.log("Received a 'msg' event");
      console.log(data);

      //Send a response to all clients, including this one
      io.sockets.emit('msg', data);
    });

    //Listen for this client to disconnect
    socket.on('disconnet', ()=> {
    console.log('user ' + socket.id + ' has disconnected');
    });
});

