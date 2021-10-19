const http = require('http');
const express = require('express');
const app = express();
const dispatch = require('./router');

const server = http.createServer(app);
const wss = require('./ws')(server);

app.use(express.static('./public'));
app.use(dispatch(app, wss));;

server.listen(3000, () => {
  console.log('lisenting 3000')
});
