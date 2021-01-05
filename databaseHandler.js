var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/dentistimoDB')
const { JSDOM } = require( "jsdom" )
const { window } = new JSDOM( "" )
const $ = require( "jquery" )( window )

// Can compare objects
const isEqual = require('lodash.isequal')
var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://broker.hivemq.com')
//var client  = mqtt.connect('mqtt://localhost:1883') // For local testing
var Dentistry = require('./models/dentistry')

process.on('exit', exitHandler.bind(null));
process.on('SIGINT', exitHandler.bind(null, {exit:true}));
process.on('SIGUSR1', exitHandler.bind(null, {exit:true}));
process.on('SIGUSR2', exitHandler.bind(null, {exit:true}));
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));

function exitHandler(options, exitCode) {
  if (options.exit){ 
    client.unsubscribe('appointments')
    client.unsubscribe('dentistries')
    console.log("client unsubscribed")
    client.end()
    console.log("client ended")

    process.exit()
  }
}

var appointments = []

var options = { // Saves the latest message in the broker,
  retain: true, // subscribers instantly get the saved message on subscribe
  qos: 0
}

client.on('connect', function () {
  client.subscribe('dentistries')
  client.subscribe('appointments')
})

client.on('message', function (topic, message) {
  // message is Buffer
  if (topic === 'appointments') {
    appointments = JSON.parse(message) // Save appointments
    Dentistry.find(function(err, result){ // Publishes when new appointment data arrives
      if (err) {
        console.log(err)
      } else {
        result = JSON.parse(JSON.stringify(result)) // Convert mongoose.Document to json
        publishDentistries(result, 0) // qos 0 because it receives on a 2 sec interval
      }
    })
  } else {
    message = JSON.parse(message)
    message.forEach(msg => {
      console.log(msg.name)   // Prints names only, saves space in terminal
    })
  }
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
              publishDentistries(data.dentists, 1) // qos 1 because the new data MUST be updated within 10 min
            }                                      // data can be sent multiple times e.g. no qos 2
          })
          console.log('changed')
        } else {
          console.log('no change')
        }
      }
    })
  })
}, 600000) // 10 min

function publishDentistries(message, qos) {
  
  options.qos = qos // update qos to 0 or 1

  // add appointments as a list for each dentistry. filter etc
  message.forEach(element => {
    element.appointments = appointments.filter(appointment => appointment.dentistry === element.id)
  });

  message = JSON.stringify(message)
  client.publish('dentistries', message, options)
}