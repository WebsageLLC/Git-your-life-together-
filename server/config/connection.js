const mongoose = require('mongoose');

mongoose.connect(

  process.env.MONGODB_URI || 'mongodb+srv://michaelNew:mF1wxj13nEkM0EBQ@gyltcluster.lrnsqs0.mongodb.net/',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;
