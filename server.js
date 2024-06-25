
const express = require('express');
const app = express();
const db = require('./db')
const bodyParser = require('body-parser');
app.use(bodyParser.json());





app.get('/', (req, res) => {
  res.send("Welcome to my hotel website!");
})




const personRoutes = require('./routes/personRoutes')
const menuItemsRoutes= require('./routes/menuItemsRoutes')


app.use('/Person',personRoutes);
app.use('/menu',menuItemsRoutes);

app.listen(3000, () => {
  console.log('Listining on port 3000')
})