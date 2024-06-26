
const express = require('express');
const app = express();
const db = require('./db')
const bodyParser = require('body-parser');
require('dotenv').config();
const person= require("./models/person")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy;


app.use(bodyParser.json());
const PORT = process.env.PORT || 3000



// Middle function
                               
const logRequest =(req,res,next)=>{
  console.log(`${new Date().toLocaleString()} Request Made to : ${req.originalUrl}`)
  next()
}

app.use(logRequest)

passport.use(new LocalStrategy(async(USERNAME,password,done)=>{
  // authentication logic here
  try {
    console.log("Receved cridentials",USERNAME,password)
    const user =  await person.findOne({username:USERNAME})
    if(!user){
      return done(null,false,{message:"Incorrect username"});
    }
    const isPasswordMatch = user.password===password ? true:false;
    if(isPasswordMatch){
      return done(null,user);
    } 
    else{
      return done(null,false,{message:"Incorrect password"}); 
    }
  } catch (error) {
    return done(error)
  }
}))

app.use(passport.initialize());

app.get('/', passport.authenticate("local",{session:false}) ,function (req, res)  {
  res.send("Welcome to my hotel website!");
})




const personRoutes = require('./routes/personRoutes')
const menuItemsRoutes= require('./routes/menuItemsRoutes');
// const person = require('./models/pe        rson');



app.use('/Person',personRoutes);
app.use('/menu',menuItemsRoutes);



app.listen(3000, () => {
  console.log('Listining on port 3000')
})