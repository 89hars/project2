const express = require('express')
const router = express.Router()
const Event = require('../models/event.model');
const Employee = require('../models/employee.model');

router.post('/checkin', async (req,res) => {
    console.log(req.body, "checkin")
    try {
      //Fetch the Employee document for the logged-in user
      const employee = await Employee.findById(req.session.user._id);
      // Create a new event document with the eventName set to "checkin"
      const checkin = new Event({eventName: 'checkin', owner: req.session.user._id });
      //Save the event to the database
      await checkin.save();
      // Send a success message
      const createdAtString = checkin.createdAt.toLocaleString();
      const successMessage = `${employee.username} has checked in at ${createdAtString} `;
      res.render('comments', { user: req.session.user.username, successMessage: successMessage });
      //res.redirect("/comments")
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  });

  router.post('/checkout', async (req,res) => {
    console.log(req.body, "checkout")
    try {
      //Fetch the Employee document for the logged-in user
      const employee = await Employee.findById(req.session.user._id);
      // Create a new event document with the eventName set to "checkin"
      const checkout = new Event({eventName: 'checkout', owner: req.session.user._id });
      //Save the event to the database
      await checkout.save();
      // Send a success message
      const createdAtString = checkout.createdAt.toLocaleString();
      const successMessage = `${employee.username} has checked out ${createdAtString} `;
      res.render('comments', { user: req.session.user.username, successMessage: successMessage });
      //res.redirect("/comments")
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  });

module.exports = router

