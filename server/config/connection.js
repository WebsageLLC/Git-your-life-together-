const mongoose = require('mongoose');

mongoose.connect(

  process.env.MONGODB_URI || 'mongodb+srv://cameliabenavides10:Camels123!@cluster0.th1ulwz.mongodb.net/goalsetter',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;
