const mongoose = require('mongoose');
const mongoURL = "mongodb://localhost:27017/hotels"
require('dotenv').config();
// const mongoURL= process.env.DB_URL
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

