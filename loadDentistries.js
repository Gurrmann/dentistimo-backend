const dentistry = require("./models/dentistry")

var insertOne = {

  name   : 'Your Dentist',
  adress : 'Spannmålsgatan 20',
  owner  : 'Dan Tist',
  city   : 'Gothenburg',
  dentists : 1,

  coordinates : ({

      longitude : 11.969388,
      latitude  : 57.707619

  }),

  opening_hours : ({

    monday : '9:00 - 17:00',
    tuesday : '8:00 - 17:00',
    wednesday : '7:00 - 16:00',
    thursday : '9:00 - 17:00',
    friday:  '9:00 - 15:00'

  })
  
}

var insertTwo = {

    name   : 'Tooth Fairy Dentist',
    adress : 'Slottsskogen',
    owner  : 'Tooth Fairy',
    city   : 'Gothenburg',
    dentists : 1,
  
    coordinates : ({
  
        longitude : 11.942625,
        latitude  : 57.685255
  
    }),
  
    opening_hours : ({
  
      monday : '7:00 - 19:00',
      tuesday : '7:00 - 19:00',
      wednesday : '7:00 - 19:00',
      thursday : '7:00 - 19:00',
      friday:  '7:00 - 19:00'
  
    })
    
  }

  var insertThree = {

    name   : 'The Crown',
    adress : 'Lindholmsallén 19',
    owner  : 'Carmen Corona',
    city   : 'Gothenburg',
    dentists : 1,
  
    coordinates : ({
  
        longitude : 11.940386,
        latitude  : 57.709872
  
    }),
  
    opening_hours : ({
  
      monday : '6:00 - 15:00',
      tuesday : '8:00 - 17:00',
      wednesday : '7:00 - 12:00',
      thursday : '7:00 - 17:00',
      friday:  '8:00 - 16:00'
  
    })
    
  }

dentistry.deleteMany({}, function (err, result) {
})

dentistry.create(insertOne, function(result, err) {
  if (result){
  console.log(result)
  }
})

dentistry.create(insertTwo, function(result, err) {
    if (result){
    console.log(result)
    }
  })

  dentistry.create(insertThree, function(result, err) {
    if (result){
    console.log(result)
    }
  })
