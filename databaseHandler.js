var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dentistimoDB')
var db = mongoose.connection;

var mqtt = require('mqtt')
//var client  = mqtt.connect('mqtt://test.mosquitto.org')
var client  = mqtt.connect('mqtt://localhost:1883')
var Dentistry = require('./models/dentistry')

client.on('connect', function () {
  setInterval(function () {
    Dentistry.find(function(err, result){
      if (err) {
        console.log(err)
      } else {
        result = JSON.stringify(result)
        client.publish('dentistries', result)
      }
    })}, 1500)
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

readDentistries()

function createDentistry(data){
  var dentistry = new Dentistry(data)
  dentistry.save(function(err, result){
    if(err){
      console.log(err)
    }
  })
}

function readDentistries(){
  Dentistry.find(function(err, result){
    if (err) {
      console.log(err)
    } else {
      console.log(result)
    }
  })
}
