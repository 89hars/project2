const express = require('express')
const router = express.Router()
const { isLoggedIn } = require('../middleware/route-guard')
const Event = require('../models/event.model');
const Employee = require('../models/employee.model');

// Get all the checks on the DB to be displayed with the user name

 router.get('/', async(req, res) => {
  const allChecks = await Event.find().populate('owner')
    console.log(allChecks)
    res.render("checks", {allChecks: allChecks, user: req.session.user})
  })


// Post to create historial of "check in" on the DB with the name of the employee.

router.post('/checkin', isLoggedIn, async (req, res) => {
  try {
    console.log(req.body, "checked in")
    const employee = await Employee.findOne({ username: req.session.user.username})
    await Event.create({ eventName: 'check-in', owner: employee._id })
    res.redirect('/checks')
  } catch (error) {
    console.log(error)
  }
})

// Post to create historial of "check out" on the DB with the name of the employee.

router.post('/checkout', async (req, res) => {
  try {
    console.log(req.body, "checked out")
    const employee = await Employee.findOne({ username: req.session.user.username})
    await Event.create({ eventName: 'check-out', owner: employee._id })
    res.redirect('/checks')
  } catch (error) {
    console.log(error)
  }
})



module.exports = router

