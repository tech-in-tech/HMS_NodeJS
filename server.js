
const express = require('express');
const app = express();
const db = require('./db')
require('dotenv').config();
const passport = require('./auth');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000



// Middle function
                               
const logRequest =(req,res,next)=>{
  console.log(`${new Date().toLocaleString()} Request Made to : ${req.originalUrl}`)
  next()
}

app.use(logRequest)



app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate("local",{session:false})
app.get('/' ,function (req, res)  {
  res.send("Welcome to my hotel website!");
})




const personRoutes = require('./routes/personRoutes')
const menuItemsRoutes= require('./routes/menuItemsRoutes');
// const person = require('./models/pe        rson');



app.use('/Person',localAuthMiddleware,personRoutes);
app.use('/menu',menuItemsRoutes);



app.listen(3000, () => {
  console.log('Listining on port 3000')
})