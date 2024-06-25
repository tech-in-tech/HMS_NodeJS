const express = require('express');
const router = express.Router();
const Person = require('./../models/person')
module.exports = router;

router.post('/', async (req, res) => {
  try {
    const data = req.body
    const newPerson = new Person(data)
    const response = await newPerson.save()
    console.log("data saved");
    res.status(200).json(response)
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" })
  }
})


// get method to get the person data from database
router.get('/', async (req, res) => {
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