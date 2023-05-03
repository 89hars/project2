const express = require('express')
const router = express.Router()
const { isLoggedIn } = require('../middleware/route-guard')
const Event = require('../models/event.model');
const Employee = require('../models/employee.model');


 router.get('/', async(req, res) => {
  const allChecks = await Event.find().populate('owner')
    
    console.log(req.session)
    res.render("checks", {allChecks, user: req.session.user.username})
  })


router.post('/checkin', async (req, res) => {
  try {
    console.log(req.body, "checked in")
    const employee = await Employee.findOne({ username: req.session.user.username})
    await Event.create({ eventName: 'checkin', owner: employee._id })
    res.redirect('/checks')
  } catch (error) {
    console.log(error)
  }
})

router.post('/checkout', async (req, res) => {
  try {
    console.log(req.body, "checked out")
    const employee = await Employee.findOne({ username: req.session.user.username})
    await Event.create({ eventName: 'checkout', owner: employee._id })
    res.redirect('/checks')
  } catch (error) {
    console.log(error)
  }
})



/*
router.get('/', async(req, res) => {
  const allChecks = await Event.find().populate('owner')
    console.log(req.session)
    res.render("checks", {allChecks, user: req.session.user.username})
  })

  */

module.exports = router

