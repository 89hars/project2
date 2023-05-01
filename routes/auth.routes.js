const express = require('express')
const Employee = require('../models/employee.model')
//const Event = require('../models/event.model')
const { response } = require('../app')
const router = express.Router()
const bcryptjs = require('bcryptjs')
const saltRounds = 10

const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/


// Get to client sigup form

router.get('/signup', (req, res, next) => {
    res.render('./auth/signup')
  })

// Post values given by client in the signup form 

router.post('/signup', async (req, res, next) => {
  
  try {
 const newSignup = await Employee.findOne({username: req.body.username})
 console.log(newSignup)

  if(!newSignup) {
    if(pwdRegex.test(req.body.password)) {
      const salt = bcryptjs.genSaltSync(saltRounds)
      const passwordHash = bcryptjs.hashSync(req.body.password, salt)
      
      await Employee.create({username: req.body.username, passwordHash: passwordHash})
      console.log("New employee", newSignup)
      res.redirect('./login')

    } else {
      res.render('auth/signup', {errorMessage: "Password should be stronger!", data: {username: req.body.username}})
    }
  } else {
    res.render('auth/signup', {errorMessage: "User name already exist"})
  }

  } catch (error) {
    console.log(error)
  }
})

// Get to client login form

router.get('/login', (req, res, next) => {
    res.render('./auth/login')
})

// Post for working with the values inside the DB for login

router.post('/login', async (req, res, next) => {
  try {
    const user = await Employee.findOne({ username: req.body.username })
    console.log(user)
    if (!!user) {
 
      if (bcryptjs.compareSync(req.body.password, user.passwordHash)) {
       
        req.session.user = { username: user.username }
        res.redirect('/profile')
      } else {
        
        res.render('auth/login', { errorMessage: 'Wrong password' })
      }
    } else {
      
      res.render('auth/login', { errorMessage: 'User does not exists' })
    }
  } catch (error) {
    console.log(error)
  }
});

/*router.post('/profile', async (req,res) => {
  try {
    // Create a new event document with the eventName set to "checkin"
    const event = new Event({ eventName: 'checkin' });
    //Save the event document to the database
    await event.create(req.body.eventName);
    // Redirect back to the profile page with success message
    res.redirect('./profile', { msg: 'Checkin Successful' });
  } catch (error) {
    console.error(error);
  }
});*/

module.exports = router