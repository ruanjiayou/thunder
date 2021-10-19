const SocketServer = require('ws').Server;

// ws连接验证
function authenticate(request, cb) {
  console.log(request.query, 'auth')
  cb(null, { _id: 'test' });
}

const wss = new SocketServer({ noServer: true });

wss.on('connection', function connection(ws, request, client) {
  ws.on('message', function message(msg) {
    console.log(`Received message ${msg} from user ${client}`);
  });
});

module.exports = function (server) {
  server.on('upgrade', function upgrade(request, socket, head) {
    console.log('upgrade')
    const [path] = request.url.split('?');
    if (path === '/thunder') {
      // This function is not defined on purpose. Implement it with your own logic.
      authenticate(request, (err, client) => {
        if (err || !client) {
          socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
          socket.destroy();
          return;
        }
        wss.handleUpgrade(request, socket, head, function done(ws) {
          wss.emit('connection', ws, request, client);
        });
      });
    } else {
      socket.write('HTTP/1.1 404 Not Found\r\n\r\n');
      socket.destroy();
    }
  });
  return wss;
}