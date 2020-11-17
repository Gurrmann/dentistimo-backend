var backend = require('./backend')
var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://test.mosquitto.org')
var dentistry = require('./models/dentistry')

var message = 'test'

dentistry.find({}, function (err, result) {
  if (err) return handleError(err);
  if (result) {
      message = result[0].name
  }
})

client.on('connect', function () {
   client.publish('dentistry', message)
   client.end()
  })

