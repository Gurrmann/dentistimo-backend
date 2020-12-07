/*var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://localhost:1883')

client.on('connect', function () {

  client.subscribe('dentistries')
})

client.on('message', function (topic, message) {
  // message is Buffer
  message = JSON.parse(message)
  console.log(message)
})*/
const isEqual = require('lodash.isequal')
var a = {a: 'a', c : {d : 'd'}, b: 'b'}
var b = {b: 'b', a: 'a', c : {d : 'd'}}

console.log(isEqual(a, b))