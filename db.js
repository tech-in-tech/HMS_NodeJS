const mongoose = require('mongoose');
// const mongoURL = "mongodb://localhost:27017/hotels"
const mongoURL = "mongodb+srv://Anubhav:asd_123_321@cluster0.tqycrw3.mongodb.net/"

mongoose.connect(mongoURL,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection;

db.on('connected',()=>{
  console.log("Connected to MongoDB");
})
db.on('error',(err)=>{
  console.log("MongoDB connection error",err)
})
db.on('disconnected',()=>{
  console.log("Disconnected from MongoDB")
})

module.exports = db;

