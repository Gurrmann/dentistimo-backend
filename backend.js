//Load HTTP module
/*const http = require("http");
const hostname = '127.0.0.1';
const port = 3000;*/

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dentistimoDB')
var db = mongoose.connection;

//Create HTTP server and listen on port 3000 for requests
/*const server = http.createServer((req, res) => {

  //Set the response HTTP header with HTTP status and Content type
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('test');
});

//listen for request on port 3000, and as a callback function have the port listened on logged
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});*/

var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://test.mosquitto.org')
var dentistry = require('./models/dentistry')

/* dentistry.find({}, function (err, result) {
  if (err) return handleError(err);
  if (result) {
      message = result[0].name
  }
}) */

client.on('connect', function () {
  client.subscribe('dentistry')
  publish('dentistry', '{"msg": "Hello internet"}')
})

client.on('message', function (topic, message) {
  // message is Buffer
  message = JSON.parse(message)
  console.log(message.msg)
  //client.end()
})

function publish(topic, message) {
  client.publish(topic, message)
}

//client.end()