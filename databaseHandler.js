var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/dentistimoDB')
const { JSDOM } = require( "jsdom" )
const { window } = new JSDOM( "" )
const $ = require( "jquery" )( window )

// Can compare objects
const isEqual = require('lodash.isequal')
var mqtt = require('mqtt')
//var client  = mqtt.connect('mqtt://test.mosquitto.org')
var client  = mqtt.connect('mqtt://localhost:1883') // For local tesitng
var Dentistry = require('./models/dentistry')

var options = {
  retain: true  // Saves the latest message in the broker,
}               // subscribers instantly get the saved message on subscribe

client.on('connect', function () {

  Dentistry.find(function(err, result){ // Publishes once on connect
    if (err) {
      console.log(err)
    } else {
      result = JSON.stringify(result)
      client.publish('dentistries', result, options)
    }
  })
  client.subscribe('dentistries')
})

client.on('message', function (topic, message) {
  // message is Buffer
  message = JSON.parse(message)
  message.forEach(msg => {
    console.log(msg.name)   // Prints names only, saves space in terminal
  })
})

function createDentistry(data){
  var dentistry = new Dentistry(data)
  dentistry.save(function(err, result){
    if(err){
      console.log(err)
    }
  })
}

setInterval(function() {
  // Get latest data from repo
  $.getJSON('https://raw.githubusercontent.com/feldob/dit355_2020/master/dentists.json', function(data) {
    
    // Get current dentistry data from  database
    Dentistry.find(function(err, result){
      if (err) { console.log(err) } 
      else {
        // Turns result into a string then json object again, needs to happen
        result = JSON.parse(JSON.stringify(result))
        for(var i = 0; i < result.length; i++){
          delete result[i]._id  // Remove mongoose variables to match
          delete result[i].__v  //  json repo data
        }
        // Compare latest with current data
        if (!isEqual(data.dentists, result)) {
          // Clear dentistries from database
          Dentistry.deleteMany({}, function (err) {
            if(err){ console.log(err) }
            else {
              // Replace dentistries in database
              data.dentists.forEach(el => {
                createDentistry(el)
              })
              client.publish('dentistries', result, options)
            }
          })
          console.log('changed')
        } else {
          console.log('no change')
        }
      }
    })
  })
}, 600000) // 10 min