const mongoose = require('mongoose');

const { database } = require('./keys');

mongoose.connect(database.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true //,
  //  user: database.MONGO_USER,
  //  pass: database.MONGO_PASSWORD
})

.then(bd => console.log('Base de datos conectada '  + database.URI))
.catch(err => console.error(err));