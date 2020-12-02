var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dentistimoDB')
const dentistry = require('./models/dentistry');

console.log('Test')

setTimeout(readDentistries, 1000)

dentistry.deleteMany({}, function (err) {
    if(err){
        console.log(err)
      }
})

function readDentistries(){
    dentistry.find(function(err, result){
      if (err) {
        console.log(err)
      } else {
        console.log(result)
      }
    })
  }
  