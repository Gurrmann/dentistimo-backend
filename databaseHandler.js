var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dentistimoDB')
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );

var mqtt = require('mqtt')
//var client  = mqtt.connect('mqtt://test.mosquitto.org')
var client  = mqtt.connect('mqtt://test.mosquitto.org')
var Dentistry = require('./models/dentistry')

client.on('connect', function () {
  
  setInterval(function () {
    client.subscribe('dentistries')
    Dentistry.find(function(err, result){
      if (err) {
        console.log(err)
      } else {
        result = JSON.stringify(result)
        client.publish('dentistries', result)
      }
    })}, 5000) // 5 sec
})

client.on('message', function (topic, message) {
  // message is Buffer
  message = JSON.parse(message)
  console.log(message)
})

function publish(topic, message) {
  client.publish(topic, message)
}

function createDentistry(data){
  var dentistry = new Dentistry(data)
  dentistry.save(function(err, result){
    if(err){
      console.log(err)
    }
  })
}

setInterval(function() {
  Dentistry.deleteMany({}, function (err) {
    if(err){
        console.log(err)
      } 
      else {
        $.getJSON('https://raw.githubusercontent.com/feldob/dit355_2020/master/dentists.json', function(data) {
          data.dentists.forEach(el => {
            createDentistry(el)
          })
        })
      }
   })
}, 60000) // 1 min