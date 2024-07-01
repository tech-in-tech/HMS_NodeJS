const express = require('express');
const router = express.Router();
const Person = require('./../models/person')
module.exports = router;
const {jwtAuthMiddleware,generateToken} = require("./../jwt")

router.post('/signup', async (req, res) => {
  try {
    const data = req.body
    const newPerson = new Person(data)
    const response = await newPerson.save()
    console.log("data saved");
    const payload = {
      id:response.id,
      username:response.username
    }
    const token = generateToken(payload)
    console.log("Token is : ",token);
    res.status(200).json({response:response,token:token})
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" })
  }
})

// Login route
router.post('/login',async(req,res)=>{
  try {
    const {username,password} = req.body;
    const user = await Person.findOne({username:username})

    if(!user || !(await user.comparePassword(password))){
      return res.status(401).json({error:"Invalid username or password"})
    }
    const payload = {
      id : user.id,
      username: user.username
    }
    const token = generateToken(payload);
    res.json({token});
  } catch (error) {
    console.log(err);
    res.status(500).json({error:"Invalid server error"})
  }
})


router.get('/profile',jwtAuthMiddleware,async (req,res)=>{
  try {
    const userData = req.user;
    console.log("user data : ",userData);

    const userId = userData.id;
    const user = await Person.findById(userId);
    res.status(200).json({user});
  } catch (error) {
    console.log(error);
    res.status(500).json({error:"Internal server error"});
  }
})

// get method to get the person data from database
router.get('/', jwtAuthMiddleware, async (req, res) => {
  try {
    const data = await Person.find()
    console.log('data fetched');
    res.status(200).json(data)
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" })
  }
})

router.get('/:workType', async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == 'chef' || workType == 'wiater' || workType == 'manager') {
      const response = await Person.find({ work: workType });
      console.log('response  fetched');
      res.status(200).json(response);
    }
    else {
      res.status(404).json({ error: "Invalid server error" });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' })
  }
})
// update method
router.put('/:id', async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;
    const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
      nnew: true,
      runValidator: true,
    })

    if (!response) {
      return res.status(404).json({ error: "person not found" });
    }

    console.log("data Updater");
    res.status(200).json(response);

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// delete method
router.delete('/:id', async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      return res.status(404).json({ error: "person not found" });
    }
    console.log("data deleted");
    res.status(200).json({message:"person data deleted"})
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = router;