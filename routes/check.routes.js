const express = require('express')
const router = express.Router()
const Event = require('../models/event.model')

router.post('/checkin', async (req,res) => {
    console.log(req.body, "checkin")
    try {
      // Create a new event document with the eventName set to "checkin"
      const checkin = new Event({eventName: 'checkin', owner: req.session.user._id });
      //Save the event to the database
      await checkin.save();
      // Send a success message
      res.redirect("/comments")
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  });

  router.post('/checkout', async (req,res) => {
    console.log(req.body, "checkout")
    try {
      // Create a new event document with the eventName set to "checkin"
      const checkout = new Event({eventName: 'checkout', owner: req.session.user._id });
      //Save the event to the database
      await checkout.save();
      // Send a success message
      res.redirect("/comments")
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  });

module.exports = router