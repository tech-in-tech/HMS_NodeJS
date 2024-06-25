const express = require("express")
const router = express.Router();
const MenuItem = require("./../models/menu");

// post method to add a Menu item

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newMenu = new MenuItem(data);
    const response = await newMenu.save();
    console.log('data saved');
    res.status(200).json(response)
  } catch (error) {
    console.log(err);
    res.status(500).json({ error: "Internat server Error" });
  }
})

// get method to get Menu items

router.get('/', async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log('data fetched');
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal erver Error" });
  }
})


//  get method on taste type;
router.use('/:tasteType',async (req,res)=>{
  try {
    const tasteType = req.params.tasteType;
    if (tasteType == 'sweet' || tasteType == 'sour' || tasteType == 'spicy'){
      const response = await MenuItem.find({taste:tasteType});
      console.log('response fetched');
      res.status(200).json(response);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({error:"Internal server error"});

  }
})

module.exports = router