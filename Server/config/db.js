const mongoose = require('mongoose');
// const mongo_URI = "mongodb+srv://DPQ:Quynh30519@coffeshop-304xg.mongodb.net/test?retryWrites=true&w=majority"

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongo_URI, {
      useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true
    });
    console.log('MongoDB connecting...');
  }
  catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

module.exports = connectDB;