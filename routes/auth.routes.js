const express = require('express')
const Employee = require('../models/employee.model')
const router = express.Router()
const bcryptjs = require('bcryptjs')
const { isLoggedOut, isLoggedIn } = require('../middleware/route-guard')
const saltRounds = 10

const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/


// Get to client sigup form

router.get('/signup', isLoggedOut, (req, res, next) => {
    res.render('auth/signup')
  })

// Post values given by client in the signup form 

router.post('/signup', isLoggedOut, async (req, res, next) => {
   
  try {
 const newSignup = await Employee.findOne({username: req.body.username})
 console.log(newSignup)

  if(!newSignup) {
    if(pwdRegex.test(req.body.password)) {
      const salt = bcryptjs.genSaltSync(saltRounds)
      const passwordHash = bcryptjs.hashSync(req.body.password, salt)
      
      await Employee.create({username: req.body.username, passwordHash: passwordHash})
      console.log("New employee", newSignup)
      res.redirect('/login')

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

router.get('/login', isLoggedOut, (req, res, next) => {
    res.render('auth/login')
})

// Post for working with the values inside the DB for login

router.post('/login', isLoggedOut, async (req, res, next) => {
  try {
    const user = await Employee.findOne({ username: req.body.username })
    console.log(user)
    if (!!user) {
 
      if (bcryptjs.compareSync(req.body.password, user.passwordHash)) {
       
        req.session.user = { username: user.username, _id:user._id  }
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


 // Log Out 

router.get('/logout', isLoggedIn, (req, res, next) => {
  req.session.destroy(err => {
    if (err) next(err);
    res.clearCookie('connect.sid'); 
    res.redirect('/'); 
  });
});


/*

router.get('/logout', isLoggedIn, (req, res, next) => {
  req.session.destroy(err => {
    if (err) next(err)
    res.redirect('/')
  })
});

*/




module.exports = router